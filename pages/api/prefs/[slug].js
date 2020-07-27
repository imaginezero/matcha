import { getUser, updateUserMetadata } from '../../../utils/auth';
import { updateTags } from '../../../utils/crm';
import { prefs } from '../../../utils/prefs';

const updatePrefs = async (req, res) => {
  const prefs = { ...req.getPrefs(), ...(req.body || {}) };
  if (await updateUserMetadata(req, { prefs })) {
    await updateTags(await getUser(req));
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
  const {
    userMetadata: { prefs },
  } = await getUser(req);
  const params = new URLSearchParams(req.query);
  res.setPrefs(prefs);
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
