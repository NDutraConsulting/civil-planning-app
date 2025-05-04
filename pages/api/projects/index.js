import ProjectSnapshot from '../../../models/ProjectSnapshot.js';
import sequelize from '../../../lib/sequelize.js';

export default async function handler(req, res) {
  await sequelize.sync();

  if (req.method === 'GET') {
    const all = await ProjectSnapshot.findAll({ order: [['createdAt', 'DESC']] });
    return res.status(200).json(all);
  }

  if (req.method === 'POST') {
    const { name, userId, inputs, timelineConfig, costData, revenueData, maintenanceData, tags } = req.body;
    try {
      const snapshot = await ProjectSnapshot.create({
        name, userId, inputs, timelineConfig, costData, revenueData, maintenanceData, tags
      });
      return res.status(201).json(snapshot);
    } catch (err) {
      return res.status(500).json({ error: 'Could not save snapshot', details: err.message });
    }
  }

  res.status(405).end();
}