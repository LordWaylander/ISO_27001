const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const processus = sequelize.define('processus', {
    id_processus: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nom_processus: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    finalite: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    frequence_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'frequence_collectes',
        key: 'id_frequence'
      }
    },
    relais_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'processus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_processus" },
        ]
      },
      {
        name: "fk_processus_indicateur",
        using: "BTREE",
        fields: [
          { name: "indicateur_id" },
        ]
      },
      {
        name: "fk_processus_frequence",
        using: "BTREE",
        fields: [
          { name: "frequence_id" },
        ]
      },
      {
        name: "fk_processus_relais_user",
        using: "BTREE",
        fields: [
          { name: "relais_user_id" },
        ]
      },
    ]
  });
  processus.associate = (models) => {
      processus.belongsToMany(models.users, { through: models.relation_ressourceUser_processus, foreignKey: "processus_id", as: "processus_ressourceUser" });

      processus.hasMany(models.opportunites, { foreignKey: "processus_id", as: "processus_opportunites" });
      processus.hasMany(models.indicateurs, { foreignKey: "processus_id", as: "processus_indicateurs" });
      processus.hasMany(models.objectifs, { foreignKey: "processus_id", as: "processus_objectifs" });
      processus.hasMany(models.plans_actions, { foreignKey: "processus_id", as: "processus_planAction" });

      processus.belongsTo(models.users, { foreignKey: "relais_user_id", as: "processus_relaisUser"});
      processus.belongsTo(models.frequence_collectes, { foreignKey: "frequence_id", as: "processus_frequences" });

      processus.hasOne(models.suivis, { foreignKey: "processus_id", as: "processus_suivis" });


  };

  return processus;
};
