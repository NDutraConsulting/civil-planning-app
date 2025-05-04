import User from '../../../models/User.js';
import jwt from 'jsonwebtoken';
import sequelize from '../../../lib/sequelize.js';

export default async function handler(req, res) {
  await sequelize.sync();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`);
  res.status(200).json({ message: 'Login successful' });
}