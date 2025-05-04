import TimelinePreset from '../../../models/TimelinePreset.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const preset = await TimelinePreset.findByPk(id);
    return preset ? res.status(200).json(preset) : res.status(404).end();
  }

  if (req.method === 'DELETE') {
    await TimelinePreset.destroy({ where: { id } });
    return res.status(204).end();
  }

  res.status(405).end();
}