import {
  getUser,
  getProfile,
  updateUserMetadata,
  updateContactTags,
  getRedirectUrl,
  prefs,
} from '../../../utils';

const updatePrefs = async (req, res) => {
  const prefs = { ...req.getPrefs(), ...(req.body || {}) };
  if (await updateUserMetadata(req, { prefs })) {
    await updateContactTags(await getProfile(req), prefs);
  }
  res.setPrefs(prefs);
  if (req.method === 'PUT') {
    res.json(prefs);
  } else {
    res.writeHead(302, { Location: '/' });
    res.end();
  }
};

const restorePrefs = async (req, res) => {
  const { userMetadata: { prefs } = {} } = await getUser(req);
  const redirectTo = getRedirectUrl(req);
  const params = new URLSearchParams({ redirectTo });
  if (prefs) res.setPrefs(prefs);
  res.writeHead(302, { Location: `/consent?${params.toString()}` });
  res.end();
};

const resetPrefs = async (req, res) => {
  res.resetPrefs();
  res.writeHead(302, { Location: '/' });
  res.end();
};

export default prefs(async function handlePrefs(req, res) {
  try {
    const { slug: action } = req.query;
    switch (action) {
      case 'reset':
        return await resetPrefs(req, res);
      case 'restore':
        return await restorePrefs(req, res);
      case 'update':
        return await updatePrefs(req, res);
      default:
        throw new Error(`invalid action: ${action}`);
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});
