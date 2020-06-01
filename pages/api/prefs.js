import auth from '../../utils/auth';
import { prefs } from '../../utils/prefs';

export default prefs(async function prefs(req, res) {
  try {
    const { idToken } = await auth.getSession(req);
    const client = await auth.getManagementClient();
    const [user] = await client.getUser(idToken);
    if (req.query.restore) {
      const { user_metadata: prefs } = user;
      res.setPrefs(prefs);
      res.setHeader('Location', '/');
      res.status(302);
      res.end();
    } else {
      if (req.body) {
        const { id } = user;
        const prefs = { ...req.getPrefs(), ...req.body };
        await client.updateUserMetadata({ id }, prefs);
        res.setPrefs(prefs);
        res.json(prefs);
      } else {
        res.json(req.getPrefs());
      }
    }
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});
