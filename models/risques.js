const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const risques = sequelize.define('risques', {
    id_risque: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    risque: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'risques',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_risque" },
        ]
      },
    ]
  });
  risques.associate = (models) => {
      risques.hasMany(models.opportunites, { foreignKey: "risque_id", as: "risques_opportunites" });
      risques.hasMany(models.objectifs, { foreignKey: "risque_id", as: "risques_objectifs" });
  };

  return risques;
};
