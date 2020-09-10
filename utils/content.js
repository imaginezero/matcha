const { format } = require('util');

const { createClient } = require('contentful');

const { getCachedEntries } = require('./cache');

function createContentfulClient(preview) {
  return preview
    ? createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
        host: 'preview.contentful.com',
      })
    : createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
      });
}

function isLink(item) {
  try {
    return (
      item.sys.type === 'Entry' && item.sys.contentType.sys.type === 'Link'
    );
  } catch (_) {
    return false;
  }
}

function isImage(item) {
  try {
    return item.sys.type === 'Asset' && !!item.fields.file.details.image;
  } catch (_) {
    return false;
  }
}

function processImage(item) {
  const { title, description } = item.fields;
  return {
    title,
    description,
    type: 'image',
    url: format(
      'https:%s?%s',
      item.fields.file.url,
      new URLSearchParams({
        w: 1024,
        h: 768,
        fm: 'jpg',
        fl: 'progressive',
        fit: 'fill',
        f: 'faces',
        q: 80,
      }).toString()
    ),
  };
}

function processLink(item) {
  const {
    id,
    contentType: {
      sys: { id: type },
    },
  } = item.sys;
  return { id, type };
}

function processEntry({ sys: { id }, fields }) {
  return {
    id,
    ...Object.fromEntries(
      Object.entries(fields).map(([key, value]) => {
        if (isLink(value)) return [key, processLink(value)];
        if (isImage(value)) return [key, processImage(value)];
        return [key, value];
      })
    ),
  };
}

async function fetchEntries(contentType, preview) {
  const client = createContentfulClient(preview);
  const entries = await client.getEntries({
    limit: 1000,
    content_type: contentType,
  });
  if (!entries || !entries.items) {
    throw new Error(`falied to fetch ${contentType} content`);
  }
  return entries.items.map(processEntry);
}

async function getEntries(contentType, preview) {
  if (!preview) {
    const entries = await getCachedEntries(contentType);
    if (entries) return entries;
  }
  return fetchEntries(contentType, preview);
}

async function getEntry(contentType, properties, preview) {
  const entries = await getEntries(contentType, preview);
  return entries.find((entry) =>
    Object.entries(properties).every(([key, value]) => entry[key] === value)
  );
}

exports.fetchEntries = fetchEntries;
exports.getEntries = getEntries;
exports.getEntry = getEntry;
