import { DataTypes} from 'sequelize';
import db from '../database/results.database';

const SecurityScanResult = db.define('ScanResults', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM('Queued', 'In Progress', 'Success', 'Failure'),
    allowNull: false,
  },
  repositoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  findings: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  queuedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  scanningAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  finishedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default SecurityScanResult;
