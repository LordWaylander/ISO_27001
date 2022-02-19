const processus = require('../models').processus;
const objectifs = require('../models').objectifs;
const indicateurs = require('../models').indicateurs;
const opportunites = require('../models').opportunites;
const risques = require('../models').risques;
const frequence_collectes = require('../models').frequence_collectes;
const suivis = require('../models').suivis;
const users = require('../models').users;
const relationUserProcessus = require('../models').relation_ressourceUser_processus;

exports.index = async (req, res, next) => {
    var process = await processus.findAll({
        include: [
            {
                model: users, as: 'processus_ressourceUser',
            },{
                model: users, as: 'processus_relaisUser',

            }
        ],
    });
    res.render('users/admin/processusListing', { title: 'Listing des processus', user: req.app.get('user'), processus: process});
};

exports.view = async (req, res, next) => {
    var idProcessus=req.params.id;
    var process = await processus.findOne({
        where: { id_processus: idProcessus },
        include: [
        {
            all: true,
            nested: true,
        }
        ],

    });
    var frequence = await frequence_collectes.findAll();
    res.json({ processus: process, frequence: frequence })
};

exports.viewprocessus = async (req, res, next) => {
    var idProcessus=req.params.id;
    var process = await processus.findOne({
        where: { id_processus: idProcessus },
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
    var processusAll = await processus.findAll({
        include: [
            {
                model: users, as: 'processus_ressourceUser',
            },{
                model: users, as: 'processus_relaisUser',

            }
        ],
    });
    res.render('users/admin/processusView', { title: 'Listing processus', user: req.app.get('user'), process: process, processus: processusAll });
};

exports.updatePage = async (req, res, next) => {
    var idProcessus=req.params.id;
    var process = await processus.findOne({
        where: { id_processus: idProcessus },
        include: [
            {
                all: true,
                nested: true
            }
        ],
    });
    var processAll = await processus.findAll();
    var user = await users.findAll();
    var frequence = await frequence_collectes.findAll();
    var risque = await risques.findAll();
    res.json({ processus: process, risques: risque, frequence: frequence, users: user , processAll: processAll});
};

exports.updateForm = async (req, res, next) => {
    console.log(req.body);
    var regexRessource = /(ressourceUser)([0-9])/;
    var regexIndicateur = /(indicateur)([0-9])/;
    var regexObjectif = /(objectif)([0-9])/;
    var regexOpportunite = /(opportunite)([0-9])/;

    try {
        var ressource = await relationUserProcessus.destroy({
            where: { processus_id: req.body.idProcessus }
        });

        var objectif = await objectifs.destroy({
            where: { processus_id: req.body.idProcessus }
        });

        var opportunite = await opportunites.destroy({
            where: { processus_id: req.body.idProcessus }
        });

        var process = await processus.update({
            nom_processus: req.body.nom_processus,
            finalite: req.body.finalite,
            frequence_id: req.body.frequence,
            relais_user_id: req.body.relais,
        }, {
            where: { id_processus: req.body.idProcessus }
        });

        for(var key in req.body) {
            if (key.match(regexRessource)) {
                var ressource = await relationUserProcessus.create({
                    ressource_user_id: req.body[key],
                    processus_id: req.body.idProcessus
                })
            }
            if (key.match(regexIndicateur)) {
                var idIndicateur = key.substr(10);

                var indicateur = await indicateurs.findOne({
                    where: { id_indicateur: idIndicateur, processus_id: req.body.idProcessus }
                });

                if (indicateur) {
                    indicateur = await indicateurs.update({
                        indicateur: req.body[key],
                    },{
                        where: { id_indicateur: idIndicateur }
                    });
                }else {
                    indicateur = await indicateurs.create({
                        indicateur: req.body[key],
                        processus_id: req.body.idProcessus
                    });
                }
            }
            if (key.match(regexObjectif)) {
                var idObjectif = key.substr(8);

                objectif = await objectifs.create({
                    objectif: req.body[key],
                    risque_id: req.body['risqueObjectif'+idObjectif],
                    processus_id: req.body.idProcessus
                });
            }
            if (key.match(regexOpportunite)) {
                var idOpportunite = key.substr(11);

                opportunite = await opportunites.create({
                    opportunite: req.body[key],
                    risque_id: req.body['risqueOpportunite'+idOpportunite],
                    processus_id: req.body.idProcessus
                })
            }
            if (key == 'janvier' || key == 'fevrier' || key == 'mars' || key == 'avril' || key == 'mai' || key == 'juin' || key == 'juillet' || key == 'aout' || key == 'septembre' || key == 'octobre' || key == 'novembre' || key == 'decembre') {
                suivi = await suivis.update({
                    [key]: req.body[key],
                },{
                    where: { processus_id: req.body.idProcessus }
                });
            }
        }

    } catch (error) {
        req.flash('error', 'Erreur lors de la modification.');
        res.status(500).send({ user: req.app.get('user') });
    }finally{
        req.flash('success', 'Processus modifié avec succès.');
        res.status(200).send({ user: req.app.get('user') });
    }

};

exports.createPage = async (req, res, next) => {
    var user = await users.findAll();
    var frequence = await frequence_collectes.findAll();
    var risque = await risques.findAll();
    res.json({ risques: risque, frequence: frequence, users: user });
};

exports.createForm = async (req, res, next) => {
    var regexRessource = /(ressourceUser)([0-9])/;
    var regexIndicateur = /(indicateur)([0-9])/;
    var regexObjectif = /(objectif)([0-9])/;
    var regexOpportunite = /(opportunite)([0-9])/

    try {
        var process = await processus.create({
            nom_processus: req.body.nom_processus,
            finalite: req.body.finalite,
            frequence_id: req.body.frequence,
            relais_user_id: req.body.relais
        });

        var process = await processus.findOne({
            order: [ [ 'id_processus', 'DESC' ]]
        });

        var idProcessus = process.id_processus;

        for(var key in req.body) {
            if (key.match(regexRessource)) {
                var ressource = await relationUserProcessus.create({
                    ressource_user_id: req.body[key],
                    processus_id: idProcessus
                })
            }

            if (key.match(regexIndicateur)) {
                var idIndicateur = key.substr(10);
                var indicateur = await indicateurs.create({
                    indicateur: req.body[key],
                    processus_id: idProcessus
                });
            }

            if (key.match(regexObjectif)) {
                var idObjectif = key.substr(8);
                var objectif = await objectifs.create({
                    objectif: req.body[key],
                    risque_id: req.body['risqueObjectif'+idObjectif],
                    processus_id: idProcessus
                });
            }

            if (key.match(regexOpportunite)) {
                var idOpportunite = key.substr(11);
                var opportunite = await opportunites.create({
                    opportunite: req.body[key],
                    risque_id: req.body['risqueOpportunite'+idOpportunite],
                    processus_id: idProcessus
                });
            }
        }
    } catch (error) {
        req.flash('error', 'Erreur lors de la modification.');
        res.status(500).send({ user: req.app.get('user') });
    }finally{
        req.flash('success', 'Processus modifié avec succès.');
        res.status(200).send({ user: req.app.get('user') });
    }

};

exports.delete = async (req, res, next) => {
    var idProcessus=req.params.id;
    try {
        await objectifs.destroy({ where: { processus_id: idProcessus } });
        await indicateurs.destroy({ where: { processus_id: idProcessus } });
        await opportunites.destroy({ where: { processus_id: idProcessus } });
        await suivis.destroy({ where: { processus_id: idProcessus } });
        await relationUserProcessus.destroy({ where: { processus_id: idProcessus } });
        await processus.destroy({ where: { id_processus: idProcessus } });
    } catch (error) {
        req.flash('error', 'Erreur lors de la suppression.');
        res.status(500).send({ user: req.app.get('user') });
    } finally {
        req.flash('success', 'Processus supprimé avec succès.');
        res.status(200).send({ user: req.app.get('user') });
    }
};
