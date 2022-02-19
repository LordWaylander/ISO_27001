const users = require('../models').users;
const objectifs = require('../models').objectifs;
const indicateurs = require('../models').indicateurs;
const risques = require('../models').risques;
const processus = require('../models').processus;

exports.index = async (req, res, next) => {
    var process = await processus.findAll({
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
    res.render('users/admin/dashboard', { title: 'DashboardAdmin', user: req.app.get('user'), processus: process });
};

exports.listingUsers = async (req, res, next) =>{
    // cf fonction ajoutRessource Update & Create -> public/javascripts/processus.js
    var usersAll = await users.findAll();
    res.json({ users: usersAll });

};
