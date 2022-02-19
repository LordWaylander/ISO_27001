const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const relation_ressourceUser_processus = sequelize.define('relation_ressourceUser_processus', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ressource_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    processus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'processus',
        key: 'id_processus'
      }
    }
  }, {
    sequelize,
    tableName: 'relation_ressourceUser_processus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_ressource_users",
        using: "BTREE",
        fields: [
          { name: "ressource_user_id" },
        ]
      },
      {
        name: "fk_ressource_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
    ]
  });
  return relation_ressourceUser_processus;
};
