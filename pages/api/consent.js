import { getUser, updateAppMetadata } from '../../utils/auth';
import { createContact, updateContact } from '../../utils/crm';

export default async function handleConsent(req, res) {
  const consent = req.body;
  const user = await getUser(req);
  if (consent && user) {
    await updateAppMetadata(req, { consent });
    try {
      await updateContact(user, consent);
    } catch (_) {
      await createContact(user, consent);
    }
    if (req.method === 'PUT') {
      res.json(consent);
    } else {
      res.writeHead(302, { Location: '/' });
      res.end();
    }
  } else {
    throw new Error('invalid request');
  }
}
