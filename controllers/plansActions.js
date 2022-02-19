const plansActions = require('../models').plans_actions;
const processus = require('../models').processus;
const users = require('../models').users;

exports.listing = async (req, res, next) => {
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
    res.render('users/admin/planActionListingAll', { title: 'Listing des Plans d\'action', user: req.app.get('user'), processus: processusAll, plansAction: plansAction });
};

exports.index = async (req, res, next) => {
    var idProcessus=req.params.id
    var processusAll = await processus.findAll(); // pr la nav
    var plansAction = await plansActions.findAll({
        where:{
            processus_id: idProcessus
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

exports.view = async (req, res, next) => {
    var idPlan=req.params.id;
    var plansAction = await plansActions.findOne({
        where: { id_planAction: idPlan },
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
    var user = await users.findAll();
    var process = await processus.findAll();

    var date = plansAction.date_creation
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateCreationEu = date;
    var date = plansAction.date_debut
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateDebutEu = date;
    var date = plansAction.date_fin
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateFinEu = date;

    res.json({ plansAction: plansAction, users: user, processus: process });
};

exports.updatePage = async (req, res, next) => {
    var idPlan=req.params.id;
    var plansAction = await plansActions.findOne({
        where: { id_planAction: idPlan },
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
    var user = await users.findAll();
    var process = await processus.findAll();

    var date = plansAction.date_creation
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateCreationEu = date;

    var date = plansAction.date_debut
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateDebutEu = date;

    var date = plansAction.date_fin
    var dateTable = date.split('-');
    date = dateTable[2]+"/"+dateTable[1]+"/"+dateTable[0];
    plansAction.dateFinEu = date;

    res.json({ plansAction: plansAction, users: user, processus: process });
};

exports.updateForm = async (req, res, next) => {
    console.log(req.body);
    var date = req.body.date_debut
    var dateTable = date.split('/');
    date = dateTable[2]+"-"+dateTable[1]+"-"+dateTable[0];
    req.body.date_debut = date;

    var date = req.body.date_fin
    var dateTable = date.split('/');
    date = dateTable[2]+"-"+dateTable[1]+"-"+dateTable[0];
    req.body.date_fin = date;

    if (req.body.traitement_curatif == '') {
        req.body.traitement_curatif = null;
    }
    if (req.body.commentaire == '') {
        req.body.commentaire = null;
    }

    try {
        var plansAction = await plansActions.update({
            etat: req.body.etat,
            description: req.body.description,
            analyse_cause: req.body.analyse_cause,
            traitement_curatif: req.body.traitement_curatif,
            action: req.body.action,
            commentaire: req.body.commentaire,
            date_debut: req.body.date_debut,
            date_fin: req.body.date_fin,
            processus_id: req.body.processus,
            assignation_user_id: req.body.assignation

        }, {
            where: { id_planAction: req.body.idPlanAction }
        });
        var idProcessus = req.body.processus;
        var process = await processus.update({
            relais_user_id: req.body.relais,
        },{
            where: { id_processus:  idProcessus}
        });
    } catch (error) {
        req.flash('error', 'erreur lors de la modification.')
        res.status(500).send({ idProcessus: idProcessus, user: req.app.get('user') });
    }
    req.flash('success', 'Plan modifié avec succès.')
    res.status(200).send({ idProcessus: idProcessus, user: req.app.get('user') });
};

exports.createPage = async (req, res, next) => {
    var process = await processus.findAll();
    var user = await users.findAll();
    res.json({ processus: process, users: user });
};

exports.createForm = async (req, res, next) => {
    console.log(req.body);
    var idProcessus = req.body.processus;
    var aujourdhui = new Date();
    aujourdhui = aujourdhui.toISOString().split('T')[0];

    var date = req.body.date_debut
    var dateTable = date.split('/');
    date = dateTable[2]+"-"+dateTable[1]+"-"+dateTable[0];
    req.body.date_debut = date;

    var date = req.body.date_fin
    var dateTable = date.split('/');
    date = dateTable[2]+"-"+dateTable[1]+"-"+dateTable[0];
    req.body.date_fin = date;

    if (req.body.traitement_curatif == '') {
        req.body.traitement_curatif = null;
    }
    if (req.body.commentaire == '') {
        req.body.commentaire = null;
    }
    try {
        var plansAction = await plansActions.create({
            date_creation: aujourdhui,
            etat: req.body.etat,
            description: req.body.description,
            analyse_cause: req.body.analyse_cause,
            declencheur: req.body.relais,
            traitement_curatif: req.body.traitement_curatif,
            action: req.body.action,
            commentaire: req.body.commentaire,
            date_debut: req.body.date_debut,
            date_fin: req.body.date_fin,
            processus_id: req.body.processus,
            assignation_user_id: req.body.assignation
        });
    } catch (error) {
        req.flash('error', 'erreur lors de la création.')
        res.status(500).send({idProcessus: idProcessus, user: req.app.get('user')});
    }
    req.flash('success', 'Plan créé avec succès.')
    res.status(200).send({idProcessus: idProcessus, user: req.app.get('user')});
};

exports.delete = async (req, res, next) => {
    var idPlan=req.params.id;
    try {
        var plansAction = await plansActions.findOne({
            where: {
                id_planAction: idPlan
            }
        });
        var idProcessus = plansAction.processus_id;
        var plansAction = await plansActions.destroy({
            where: {
                id_planAction: idPlan
            }
        });
    } catch (e) {
        req.flash('error', 'Erreur lors de la suppression.');
        res.status(500).send({idProcessus: idProcessus, user: req.app.get('user')});
    }
    req.flash('success', 'Plan supprimé avec succès.');
    res.status(200).send({idProcessus: idProcessus, user: req.app.get('user')});
};
