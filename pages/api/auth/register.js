import User from '../../../models/User.js';
import sequelize from '../../../lib/sequelize.js';

export default async function handler(req, res) {
  await sequelize.sync();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  try {
    const user = await User.create({ email, passwordHash: password });
    res.status(201).json({ message: 'Registered', email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
}