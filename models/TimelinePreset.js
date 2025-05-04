import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const TimelinePreset = sequelize.define('TimelinePreset', {
  name: { type: DataTypes.STRING, allowNull: false },
  config: { type: DataTypes.JSONB, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: true
});

export default TimelinePreset;