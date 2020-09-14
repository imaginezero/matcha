import { getEntries, getEntry } from '../utils';

export async function getPages(preview) {
  return await getEntries('page', preview);
}

export async function getPage(properties, preview) {
  return await getEntry('page', properties, preview);
}
