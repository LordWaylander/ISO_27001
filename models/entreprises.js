const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const entreprises = sequelize.define('entreprises', {
    id_entreprise: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_entreprise: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adresse: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    code_postal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ville: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'entreprises',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_entreprise" },
        ]
      },
    ]
  });
  entreprises.associate = (models) => {
      entreprises.hasMany(models.users, { foreignKey: "entreprise_id", as: "entreprises_users" });
  };

  return entreprises;
};
