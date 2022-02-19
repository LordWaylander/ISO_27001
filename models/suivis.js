const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const suivis = sequelize.define('suivis', {
    id_suivi: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    janvier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fevrier: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mars: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avril: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mai: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    juin: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    juillet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    aout: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    septembre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    octobre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    novembre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    decembre: {
      type: DataTypes.STRING(255),
      allowNull: true
  },
  processus_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'processus',
      key: 'id_processus'
    }
  },
  }, {
    sequelize,
    tableName: 'suivis',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_suivi" },
        ]
      },
      {
        name: "fk_suivis_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
    ]
  });
  suivis.associate = (models) => {
      suivis.belongsTo(models.processus, { foreignKey: "processus_id", as: "suivis_processus" });
  };

  return suivis;
};
