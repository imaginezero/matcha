import cookie from 'cookie';

const defaultPrefs = {
  isParent: false,
  isStudent: false,
  isScientist: false,
  isOfficial: false,
  isNgoExec: false,
  isCompanyExec: false,
};

export function getPrefs(req) {
  console.log(req.headers.cookie);
  const { prefs = '{}' } = cookie.parse(req.headers.cookie || '');
  return { ...defaultPrefs, ...JSON.parse(prefs) };
}

export function setPrefs(res, prefs = {}) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('prefs', JSON.stringify(prefs), {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  );
}

export function resetPrefs(res) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('prefs', '', {
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    })
  );
}

export function prefs(handler) {
  return (req, res) => {
    req.getPrefs = getPrefs.bind(null, req);
    res.setPrefs = setPrefs.bind(null, res);
    res.resetPrefs = resetPrefs.bind(null, res);
    return handler(req, res);
  };
}
