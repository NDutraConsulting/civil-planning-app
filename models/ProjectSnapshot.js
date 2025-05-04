import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const ProjectSnapshot = sequelize.define('ProjectSnapshot', {
  name: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  inputs: DataTypes.JSONB,
  timelineConfig: DataTypes.JSONB,
  costData: DataTypes.JSONB,
  revenueData: DataTypes.JSONB,
  maintenanceData: DataTypes.JSONB,
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  timestamps: true
});

export default ProjectSnapshot;