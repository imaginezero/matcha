import { getProfile, sendContactEvent } from '../../utils';

export default async function handleEvent(req, res) {
  if (req.method === 'POST') {
    const profile = await getProfile(req);
    if (profile) {
      const { name, properties } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (name) {
        await sendContactEvent(profile, name, properties);
      }
    }
  }
  res.json('ok');
}
