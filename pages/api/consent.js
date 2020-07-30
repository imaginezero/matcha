import {
  getProfile,
  updateUserAppMetadata,
  createContact,
  updateContact,
} from '../../utils';

export default async function handleConsent(req, res) {
  const consent = req.body;
  const profile = await getProfile(req);
  if (consent && profile) {
    await updateUserAppMetadata(req, { consent });
    try {
      await updateContact(profile, consent);
    } catch (_) {
      if (consent.updates || consent.feedback) {
        await createContact(profile, consent);
      }
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
