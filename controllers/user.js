const users = require('../models').users;
const plansActions = require('../models').plans_actions;
const processus = require('../models').processus;

exports.index = async (req, res, next) => {

    var plansAction = await plansActions.findAll({
        where:{
            assignation_user_id: req.params.idUser
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

    res.render('users/classique/dashboard', { title: 'Dashboard', user: req.app.get('user'), plansAction: plansAction });
};

exports.listing = async (req, res, next) => {

    var user = await users.findAll();

    res.json({ users: user });
};

exports.processus = async (req, res, next) => {
    var plansAction = await plansActions.findAll({
        where:{
            assignation_user_id: req.params.idUser
        },
        include: [
            {
                model: users, as: 'planActions_assignationUser',
            },{
                model: processus, as: 'planActions_processus',
                include: [
                    {
                        model: users, as: 'processus_relaisUser',
                    },{
                        model: users, as: 'processus_ressourceUser',
                    }
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

    res.render('users/classique/processus', { title: 'Processus', user: req.app.get('user'), plansAction: plansAction });
};

exports.plansAction = async (req, res, next) => {
    var plansAction = await plansActions.findAll({
        where:{
            assignation_user_id: req.params.idUser
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

    res.render('users/classique/dashboard', { title: 'Plans d\'action', user: req.app.get('user'), plansAction: plansAction });
};
