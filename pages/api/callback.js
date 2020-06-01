import auth from '../../utils/auth';

export default async function callback(req, res) {
  try {
    await auth.handleCallback(req, res, {
      redirectTo: '/api/prefs?restore=1',
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
