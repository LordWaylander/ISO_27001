const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const roles = sequelize.define('roles', {
    id_role: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
  roles.associate = (models) => {
      roles.hasMany(models.users, { foreignKey: "role_id", as: "roles_users" });
  };

  return roles;
};
