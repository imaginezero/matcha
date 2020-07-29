export default function handlePreviewMode(req, res) {
  const { slug: action, redirect = '/' } = req.query;
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
    res.writeHead(302, { Location: redirect });
    res.end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
