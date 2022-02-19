const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const frequences = sequelize.define('frequence_collectes', {
    id_frequence: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    frequence: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'frequence_collectes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_frequence" },
        ]
      },
    ]
  });
  frequences.associate = (models) => {
      frequences.hasMany(models.processus, { foreignKey: "frequence_id", as: "frequences_processus" });
  };

  return frequences;
};
