import ProjectSnapshot from '../../../models/ProjectSnapshot.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const snapshot = await ProjectSnapshot.findByPk(id);
    return snapshot ? res.status(200).json(snapshot) : res.status(404).end();
  }

  if (req.method === 'DELETE') {
    await ProjectSnapshot.destroy({ where: { id } });
    return res.status(204).end();
  }

  if (req.method === 'PUT') {
    const { name, tags } = req.body;
    const snapshot = await ProjectSnapshot.findByPk(id);
    if (!snapshot) return res.status(404).end();
    snapshot.name = name || snapshot.name;
    snapshot.tags = tags || snapshot.tags;
    await snapshot.save();
    return res.status(200).json(snapshot);
  }

  res.status(405).end();
}