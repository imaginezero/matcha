import { getUser } from '../../utils/auth';
import { sendEvent } from '../../utils/crm';

export default async function handleConsent(req, res) {
  if (req.method === 'POST') {
    const user = await getUser(req);
    if (user) {
      const { name, properties } =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (name) {
        await sendEvent(user, name, properties);
      }
    }
  }
  res.json('ok');
}
