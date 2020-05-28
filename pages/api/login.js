import auth from '../../services/auth';

export default async function login(req, res) {
  try {
    await auth.handleLogin(req, res, {
      authParams: {
        ui_locales: 'de',
      },
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
