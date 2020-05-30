import auth from '../../services/auth';

export default async function profile(req, res) {
  try {
    const client = await auth.getManagementClient();
    await auth.handleProfile(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
