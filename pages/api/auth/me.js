import { parseUserFromRequest } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const user = parseUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  res.status(200).json({ email: user.email });
}