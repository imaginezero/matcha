import {
  getUser,
  updateUserAppMetadata,
  createContact,
  updateContact,
} from '../../utils';

export default async function handleConsent(req, res) {
  const consent = req.body;
  const user = await getUser(req);
  if (consent && user) {
    await updateUserAppMetadata(req, { consent });
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
