const { createHash } = require('crypto');

const axios = require('axios');

async function request(url, { method = 'get', ...config } = {}) {
  const auth = { username: 'user', password: process.env.MAILCHIMP_API_KEY };
  return await axios.request({ url, method, auth, ...config });
}

function getUrl(email, suffix) {
  const baseUrl = 'https://us10.api.mailchimp.com/3.0/lists/7b5132350f/members';
  if (email) {
    const hash = createHash('md5').update(email.toLowerCase()).digest('hex');
    return `${baseUrl}/${hash}${suffix ? `/${suffix}` : ''}`;
  }
  return baseUrl;
}

function getTags({ userMetadata: prefs }) {
  return Object.entries(prefs).map(([name, value]) => ({
    name,
    status: value ? 'active' : 'inactive',
  }));
}

function getMergeFields({ givenName }) {
  return { FNAME: givenName };
}

function getPermissions(consent) {
  return Object.entries({
    updates: 'f3beb2ad6d',
    feedback: 'dbd5ef93a1',
  }).map(([key, id]) => ({
    marketing_permission_id: id,
    enabled: consent[key],
  }));
}

export async function getContact({ email }) {
  const { data: contact } = await request(getUrl(email));
  return contact;
}

export async function createContact({ email, ...user }, consent) {
  return await request(getUrl(), {
    method: 'POST',
    data: {
      email_address: email,
      status: 'pending',
      merge_fields: getMergeFields(user),
      ...(consent ? { marketing_permissions: getPermissions(consent) } : {}),
    },
  });
}

export async function updateContact({ email, ...user }, consent) {
  return await request(getUrl(email), {
    method: 'PATCH',
    data: {
      merge_fields: getMergeFields(user),
      ...(consent ? { marketing_permissions: getPermissions(consent) } : {}),
    },
  });
}

export async function updateTags({ email, ...user }) {
  return await request(getUrl(email, 'tags'), {
    method: 'POST',
    data: { tags: getTags(user) },
  });
}

export async function sendEvent({ email }, name, properties) {
  return await request(getUrl(email, 'events'), {
    method: 'POST',
    data: { name, properties },
  });
}
