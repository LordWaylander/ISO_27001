const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define('users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_user: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id_role'
      }
    },
    entreprise_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'entreprises',
        key: 'id_entreprise'
      }
  },
  resetPasswordToken: {
      type: DataTypes.STRING(255),
      allowNull: true
  },
  resetPasswordExpires: {
      type: DataTypes.DATEONLY,
      allowNull: true
  }

  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "fk_entreprise_users",
        using: "BTREE",
        fields: [
          { name: "entreprise_id" },
        ]
      },
      {
        name: "fk_role_users",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  users.associate = (models) => {
      users.belongsTo(models.entreprises, { foreignKey: "entreprise_id", as: "users_entreprise" });
      users.belongsTo(models.roles, { foreignKey: "role_id", as: "users_role" });
      users.hasOne(models.processus, { foreignKey: "relais_user_id", as: "users_relaisProcessus" });
      users.hasOne(models.plans_actions, { foreignKey: "assignation_user_id", as: "users_assignationPlanAction" });
      users.belongsToMany(models.processus, { through: models.relation_ressourceUser_processus, foreignKey: "ressource_user_id", as: "users_ressourceProcessus" });
  };
  return users;
};
