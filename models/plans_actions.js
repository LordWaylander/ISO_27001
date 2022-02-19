const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const planActions = sequelize.define('plans_actions', {
    id_planAction: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_creation: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    etat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    analyse_cause: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    traitement_curatif: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commentaire: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date_debut: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_fin: {
      type: DataTypes.DATEONLY,
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
  assignation_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id_user'
    }
}
  }, {
    sequelize,
    tableName: 'plans_actions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_planAction" },
        ]
      },
      {
        name: "fk_planAction_processus",
        using: "BTREE",
        fields: [
          { name: "processus_id" },
        ]
      },
      {
        name: "fk_planAction_assignation_user",
        using: "BTREE",
        fields: [
          { name: "assignation_user_id" },
        ]
      },
    ]
  });
  planActions.associate = (models) => {
      planActions.belongsTo(models.processus, { foreignKey: "processus_id", as: "planActions_processus" });
      planActions.belongsTo(models.users, { foreignKey: "assignation_user_id", as: "planActions_assignationUser" });
  };

  return planActions;
};
