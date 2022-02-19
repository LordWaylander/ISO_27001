var DataTypes = require("sequelize").DataTypes;
var _entreprises = require("./entreprises");

var _frequence_collectes = require("./frequence_collectes");
var _indicateurs = require("./indicateurs");
var _objectifs = require("./objectifs");
var _opportunites = require("./opportunites");
var _plans_actions = require("./plans_actions");
var _processus = require("./processus");
var _relation_ressourceUser_processus = require("./relation_ressourceUser_processus");
var _risques = require("./risques");
var _roles = require("./roles");
var _suivis = require("./suivis");
var _users = require("./users");

function initModels(sequelize) {
  var entreprises = _entreprises(sequelize, DataTypes);
  var frequence_collectes = _frequence_collectes(sequelize, DataTypes);
  var indicateurs = _indicateurs(sequelize, DataTypes);
  var objectifs = _objectifs(sequelize, DataTypes);
  var opportunites = _opportunites(sequelize, DataTypes);
  var plans_actions = _plans_actions(sequelize, DataTypes);
  var processus = _processus(sequelize, DataTypes);
  var relation_ressourceUser_processus = _relation_ressourceUser_processus(sequelize, DataTypes);
  var risques = _risques(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var suivis = _suivis(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  return {
    entreprises,
    frequence_collectes,
    indicateurs,
    objectifs,
    opportunites,
    plans_actions,
    processus,
    relation_ressourceUser_processus,
    risques,
    roles,
    suivis,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
