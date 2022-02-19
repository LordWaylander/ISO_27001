const users = require('../models').users;
const processus = require('../models').processus;
const roles = require('../models').roles;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');


exports.index = async (req, res, next) => {
    var clients = await users.findAll({
        where: {
            [Sequelize.Op.or]: [
                {role_id: '2'},
                {role_id: '3'}
            ]
        },
        include: [
            {
                all: true,
            }
        ],
    });
    var process = await processus.findAll();
    res.render('clients/listing', { title: 'listing des clients', user: req.app.get('user'), clients: clients, processus: process });
};

exports.view = async (req, res, next) => {
    var idClient=req.params.id;
    var clientuser = await users.findOne({
        where: { id_user: idClient },
        include: [
            {
                all: true,
            }
        ],
    })
    var process = await processus.findAll();
    res.render('clients/view', { title: 'Client', user: req.app.get('user'), clientuser: clientuser, processus: process });
};

exports.updatePage = async (req, res, next) => {
    var idClient=req.params.id;
    var clientuser = await users.findOne({
        where: { id_user: idClient },
        include: [
            {
                all: true,
            }
        ],
    });
    var process = await processus.findAll();
    var role = await roles.findAll();
    res.render('clients/update', { title: 'Modification client', user: req.app.get('user'), clientuser: clientuser, processus: process, roles: role });
};

exports.updateForm = async (req, res, next) => {
    try {
        var client = await users.update({
            nom_user: req.body.username,
            email: req.body.email,
            role_id: req.body.role
        }, {
            where: { id_user: req.body.id_user }
        })
    } catch (error) {
        req.flash('error', 'erreur lors de la modification.')
        res.redirect('/client')
    }
    req.flash('success', 'Client modifié avec succès.')
    res.redirect('/clients')
};

exports.createPage = async (req, res, next) => {
    var process = await processus.findAll();
    var role = await roles.findAll();
    res.render('clients/create', { title: 'Création client', user: req.app.get('user'), processus: process, roles: role });
};

exports.createForm = async (req, res, next) => {
    // async, pour utiliser await pour ATTENDRE la réponse avt de continuer
    var username = await users.findOne({ where: { nom_user: req.body.username } });
    var email = await users.findOne({ where: { email: req.body.email } });

    if (username) {
        req.flash('error', 'Nom d\'utilisateur déjà utilisé.');
        res.redirect('/clients');
    }else if(email) {
        req.flash('error', 'Email déjà utilisé.');
        res.redirect('/clients');
    }else {
        var pwd = "useruser"
        var hash = await bcrypt.hash(pwd, 10)
        var user = await users.create({
            nom_user: req.body.username,
            email: req.body.email,
            password: hash,
            role_id: req.body.role
        });
        req.flash('success', 'Compte créé avec succès.');
        res.redirect('/clients');
    }
};

exports.delete = async (req, res, next) => {
    var idClient=req.params.id;
    try {
        var client = await users.destroy({
            where: {
                id_user: idClient
            }
        })
    } catch (e) {
        req.flash('error', 'Erreur lors de la suppression.');
        res.redirect('/clients');
    }
    req.flash('success', 'Client supprimé avec succès.');
    res.redirect('/clients');
};
