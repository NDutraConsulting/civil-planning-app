import TimelinePreset from '../../../models/TimelinePreset.js';
import sequelize from '../../../lib/sequelize.js';

export default async function handler(req, res) {
  await sequelize.sync();

  if (req.method === 'GET') {
    const presets = await TimelinePreset.findAll({ attributes: ['id', 'name', 'userId'] });
    return res.status(200).json(presets);
  }

  if (req.method === 'POST') {
    const { name, config, userId } = req.body;
    try {
      const preset = await TimelinePreset.create({ name, config, userId });
      return res.status(201).json(preset);
    } catch (err) {
      return res.status(500).json({ error: 'Could not save preset', details: err.message });
    }
  }

  res.status(405).end();
}