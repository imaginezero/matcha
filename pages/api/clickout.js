import {
  createContact,
  subscribe,
} from '../../utils';


export default async function handleClickout(req, res) {
  const email = req.body.email;
  const target = req.body.target;
  try {
    await subscribe(email);
  }catch(_) {}
  
  res.writeHead(302, {Location: target});
  res.end();
}
