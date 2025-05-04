import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false }
}, {
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      user.passwordHash = await bcrypt.hash(user.passwordHash, 10);
    }
  }
});

User.prototype.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default User;