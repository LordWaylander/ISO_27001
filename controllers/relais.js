const users = require('../models').users;
const objectifs = require('../models').objectifs;
const indicateurs = require('../models').indicateurs;
const risques = require('../models').risques;
const processus = require('../models').processus;
const opportunites = require('../models').opportunites;
const frequence_collectes = require('../models').frequence_collectes;
const suivis = require('../models').suivis;
const relationUserProcessus = require('../models').relation_ressourceUser_processus;
const plansActions = require('../models').plans_actions;

exports.index = async (req, res, next) => {
    var process = await processus.findAll({
        where:{
            relais_user_id: req.params.idUser
        },
        include: [
            {
                model: objectifs, as: 'processus_objectifs',
                include: [
                    {
                        model: risques, as: 'objectifs_risques',
                    }
                ],
            },{
                model: users, as: 'processus_relaisUser',

            },{
                model: indicateurs, as: 'processus_indicateurs',
            }
        ],
    });
    res.render('users/relais/dashboard', { title: 'DashboardRelais', user: req.app.get('user'), processus: process });
};

exports.processus = async (req, res, next) => {
    var process = await processus.findAll({
        where:{
            relais_user_id: req.params.idUser
        },
        include: [
            {
                model: objectifs, as: 'processus_objectifs',
                include: [
                    {
                        model: risques, as: 'objectifs_risques',
                    }
                ],
            },{
                model: users, as: 'processus_relaisUser',

            },{
                model: indicateurs, as: 'processus_indicateurs',
            },{
                model: users, as: 'processus_ressourceUser',
            }
        ],
    });
    res.render('users/relais/processus', { title: 'Processus', user: req.app.get('user'), processus: process });
};

exports.processusView = async (req, res, next) => {
    var process = await processus.findOne({
        where:{
            relais_user_id: req.params.idUser,
            id_processus: req.params.idProcessus
        },
        include: [
            {
                model: objectifs, as: 'processus_objectifs',
                include: [
                    {
                        model: risques, as: 'objectifs_risques',
                    }
                ],
            },{
                model: opportunites, as: 'processus_opportunites',
                include: [
                    {
                        model: risques, as: 'opportunites_risques',
                    }
                ],
            },{
                model: users, as: 'processus_relaisUser',

            },{
                model: users, as: 'processus_ressourceUser',
            }
        ],
    });

    var processusAll = await processus.findAll();
    res.render('users/relais/processusView', { title: 'Processus', user: req.app.get('user'), process: process, processus: processusAll });
};

exports.plansAction = async (req, res, next) => {
    var processusAll = await processus.findAll(); // pr la nav
    var plansAction = await plansActions.findAll({
        include: [
            {
                model: processus, as: 'planActions_processus',
            }
        ]
    });
    for (var i = 0; i < plansAction.length; i++) {
        var date = plansAction[i].date_creation
        var dateTable = date.split('-');
        date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
        plansAction[i].dateCreationEu = date;
    }
    res.render('users/relais/planActionListingAll', { title: 'Listing des Plans d\'action', user: req.app.get('user'), processus: processusAll, plansAction: plansAction });
};

exports.plansActionView = async (req, res, next) => {
    var processusAll = await processus.findAll(); // pr la nav
    var plansAction = await plansActions.findAll({
        where:{
            processus_id: req.params.idProcessus,
        },
        include: [
            {
                model: users, as: 'planActions_assignationUser',
            },{
                model: processus, as: 'planActions_processus',
                include: [
                    {
                        model: users, as: 'processus_relaisUser',
                    },
                ],
            }
        ]
    });

    for (var i = 0; i < plansAction.length; i++) {
        var date = plansAction[i].date_creation
        var dateTable = date.split('-');
        date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
        plansAction[i].dateCreationEu = date;
        var date = plansAction[i].date_debut
        var dateTable = date.split('-');
        date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
        plansAction[i].dateDebutEu = date;
        var date = plansAction[i].date_fin
        var dateTable = date.split('-');
        date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
        plansAction[i].dateFinEu = date;
    }
    res.render('users/admin/planActionListing', { title: 'Listing des Plans d\'action', user: req.app.get('user'), processus: processusAll, plansAction: plansAction });
};
