const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const objectifs = sequelize.define('objectifs', {
    id_objectif: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    objectif: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    risque_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'risques',
        key: 'id_risque'
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
    tableName: 'objectifs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_objectif" },
        ]
      },
      {
        name: "fk_objectifs_risque",
        using: "BTREE",
        fields: [
          { name: "risque_id" },
        ]
      },
      {
        name: "fk_objectifs_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
    ]
  });
  objectifs.associate = (models) => {
      objectifs.belongsTo(models.risques, { foreignKey: "risque_id", as: "objectifs_risques" });
      objectifs.belongsTo(models.processus, { foreignKey: "processus_id", as: "objectifs_processus" });
  };

  return objectifs;
};
