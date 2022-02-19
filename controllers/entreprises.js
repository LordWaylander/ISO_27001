const entreprises = require('../models').entreprises;
const processus = require('../models').processus;

exports.index = async (req, res, next) => {
    var entreprise = await entreprises.findAll();
    var process = await processus.findAll();
    res.render('entreprises/listing', { title: 'Listing des entreprises', user: req.app.get('user'), entreprises: entreprise, processus: process});
};
exports.view = async (req, res, next) => {
    var idEntreprise=req.params.id;
    var entreprise = await entreprises.findOne({
        where: { id_entreprise: idEntreprise }
    });
    var process = await processus.findAll();
    res.render('entreprises/view', { title: 'Entreprise', user: req.app.get('user'), entreprise: entreprise, processus: process });
};

exports.updatePage = async (req, res, next) => {
    var idEntreprise=req.params.id;
    var entreprise = await entreprises.findOne({
        where: { id_entreprise: idEntreprise },
    });
    var process = await processus.findAll();
    res.render('entreprises/update', { title: 'Modification entreprise', user: req.app.get('user'), entreprise: entreprise, processus: process });
};

exports.updateForm = async (req, res, next) => {
    try {
        var entreprise = await entreprises.update({
            nom_entreprise: req.body.nom_entreprise,
            adresse: req.body.adresse,
            code_postal: req.body.code_postal,
            ville: req.body.ville
        }, {
            where: { id_entreprise: req.body.id_entreprise }
        })
    } catch (error) {
        req.flash('error', 'erreur lors de la modification.')
        res.redirect('/entreprises')
    }
    req.flash('success', 'Client modifié avec succès.')
    res.redirect('/entreprises')
};

exports.createPage = async (req, res, next) => {
    var process = await processus.findAll();
    res.render('entreprises/create', { title: 'Création entreprise', user: req.app.get('user'), processus: process });
};

exports.createForm = async (req, res, next) => {
    var nomEntreprise = await entreprises.findOne({ where: { nom_entreprise: req.body.nom_entreprise } });

    if (nomEntreprise) {
        req.flash('error', 'Cette entreprise existe déjà.');
        res.redirect('/entreprises');
    }else {
        var entreprise = await entreprises.create({
            nom_entreprise: req.body.nom_entreprise,
            adresse: req.body.adresse,
            code_postal: req.body.code_postal,
            ville: req.body.ville
        });
        req.flash('success', 'Entreprise créé avec succès.');
        res.redirect('/entreprises');
    }
};

exports.delete = async (req, res, next) => {
    var idEntreprise=req.params.id;
    try {
        var entreprise = await entreprises.destroy({
            where: {
                id_entreprise: idEntreprise
            }
        })
    } catch (e) {
        req.flash('error', 'Erreur lors de la suppression.');
        res.redirect('/entreprises');
    }
    req.flash('success', 'Entreprise supprimée avec succès.');
    res.redirect('/entreprises');
};
