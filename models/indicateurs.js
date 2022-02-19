const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const indicateurs = sequelize.define('indicateurs', {
    id_indicateur: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    indicateur: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'indicateurs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_indicateur" },
        ]
      },
      {
        name: "fk_indicateurs_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
    ]
  });
  indicateurs.associate = (models) => {
      indicateurs.belongsTo(models.processus, { foreignKey: "processus_id", as: "indicateurs_processus" });
  };

  return indicateurs;
};
