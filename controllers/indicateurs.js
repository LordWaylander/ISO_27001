const processus = require('../models').processus;
const indicateurs = require('../models').indicateurs;

exports.updatePage = async (req, res, next) => {
    var idProcessus=req.params.id;
    var process = await processus.findOne({
        where: { id_processus: idProcessus },
        include: [
            {
                model: indicateurs, as: 'processus_indicateurs',
            }]
    });
    var processAll = await processus.findAll();
    res.json({ processus: process, processAll: processAll});
};

exports.updateForm = async (req, res, next) => {
    var regexIndicateur = /(indicateur)([0-9])/;

    try {
        var indicateur = await indicateurs.destroy({
            where: { processus_id: req.body.idProcessus }
        });
        for(var key in req.body) {
            if (key.match(regexIndicateur)) {
                var idIndicateur = key.substr(10);

                indicateur = await indicateurs.create({
                    indicateur: req.body[key],
                    processus_id: req.body.idProcessus
                });
            }
        }
    } catch (error) {
        req.flash('error', 'Erreur lors de la modification.');
        res.status(500).send({ user: req.app.get('user') });
    }finally{
        req.flash('success', 'Indicateur modifié avec succès.');
        res.status(200).send({ user: req.app.get('user') });
    }
};

exports.createPage = async (req, res, next) => {
    var process = await processus.findAll();
    res.json({ processus: process });
};

exports.createForm = async (req, res, next) => {
    var regexIndicateur = /(indicateur)([0-9])/;

    try {
        for(var key in req.body) {
            if (key.match(regexIndicateur)) {

                var idIndicateur = key.substr(10);
                var indicateur = await indicateurs.create({
                    indicateur: req.body[key],
                    processus_id: req.body.processus
                });
            }
        }
    } catch (error) {
        req.flash('error', 'Erreur lors de la création.');
        res.status(500).send({ user: req.app.get('user') });
    }finally{
        req.flash('success', 'Indicateur créé avec succès.');
        res.status(200).send({ user: req.app.get('user') });
    }

};
