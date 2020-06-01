import auth from '../../utils/auth';
import { prefs } from '../../utils/prefs';

export default prefs(async function logout(req, res) {
  try {
    await auth.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
});
