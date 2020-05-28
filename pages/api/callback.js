import auth from '../../services/auth';

export default async function callback(req, res) {
  try {
    await auth.handleCallback(req, res, { redirectTo: '/' });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
