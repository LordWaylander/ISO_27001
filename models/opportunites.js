const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const opportunites = sequelize.define('opportunites', {
    id_opportunite: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    opportunite: {
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
    tableName: 'opportunites',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_opportunite" },
        ]
      },
      {
        name: "fk_opportunites_risque",
        using: "BTREE",
        fields: [
          { name: "risque_id" },
        ]
      },
      {
        name: "fk_opportunites_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
    ]
  });
  opportunites.associate = (models) => {
      opportunites.belongsTo(models.risques, { foreignKey: "risque_id", as: "opportunites_risques" });
      opportunites.belongsTo(models.processus, { foreignKey: "processus_id", as: "opportunites_processus" });
  };

  return opportunites;
};
