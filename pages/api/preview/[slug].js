import { getRedirectUrl } from '../../../utils';

export default function handlePreviewMode(req, res) {
  const redirectTo = getRedirectUrl(req) || '/';
  const { slug: action } = req.query;
  try {
    switch (action) {
      case 'on':
        res.setPreviewData({});
        break;
      case 'off':
        res.clearPreviewData();
        break;
      default:
        throw new Error(`invalid action: ${action}`);
    }
    res.writeHead(302, { Location: redirectTo });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
