const users = require('../models').users;
const processus = require('../models').processus;
const objectifs = require('../models').objectifs;
const indicateurs = require('../models').indicateurs;
const risques = require('../models').risques;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sentMail = require('../mailer/sentMail');
const { Op } = require("sequelize");

exports.loginPage = (req, res, next) => {
    var user = req.app.get('user');
    var token = req.app.get('token');
    if (user && token) {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        var dateNow = Date.now();
        dateNow = Math.trunc(dateNow/1000);
        console.log(decodedToken);
        console.log(dateNow);
        if (decodedToken.exp < dateNow) {
            return res.render('auth/login', { title: 'login'});
        }else if (user.role_id == 1) {
            return res.redirect("/admin");
        }else if (user.role_id == 2) {
            return res.redirect("/relais/"+user.id_user);
        }else if (user.role_id == 3) {
            return res.redirect("/user/"+user.id_user);
        }
    }else {
        return res.render('auth/login', { title: 'login'});
    }
};

exports.loginForm = async (req, res, next) => {
    // async, pour utiliser await pour ATTENDRE la réponse avt de continuer
    var user = await users.findOne({
        where: { email: req.body.email },
        include: "users_role"
    });

    if (!user) {
        req.flash('error', 'Email incorrect.');
        return res.redirect('/');
    }else {
        var userWhithoutPwd = await users.findOne({
            where: { email: req.body.email },
            attributes: { exclude: ['password'] },
            include: "users_role"
        });
    }
    bcrypt.compare (req.body.password, user.password, function(err, password) {
        if(password !== true){
            req.flash('error', 'Mot de passe incorrect.');
            return res.redirect('/');
        }else {
            var token = jwt.sign(
                { userId: user.id_user },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            );

            req.app.set('token', token);
            req.app.set('user', userWhithoutPwd);

            if(user.users_role.role == 'admin'){
                return res.redirect("/admin");
            }else if(user.users_role.role == 'relais'){
                return res.redirect("/relais/"+user.id_user);
            }else if(user.users_role.role == 'classique') {
                return res.redirect("/user/"+user.id_user);
            }
        }
    });
};

exports.signupPage = async (req, res, next) => {
    var process = await processus.findAll();

    res.render('auth/signup', { title: 'signup', user: req.app.get('user'), processus: process })
};

exports.signupForm = async (req, res, next) => {
    console.log(req.body);

    var username = await users.findOne({ where: { nom_user: req.body.username } });
    var email = await users.findOne({ where: { email: req.body.email } });

    if (username) {
        req.flash('error', 'Nom d\'utilisateur déjà utilisé.');
        res.redirect('/signup');
    }else if(email) {
        req.flash('error', 'Email déjà utilisé.');
        res.redirect('/signup');
    }else {
        var token = crypto.randomBytes(40).toString('hex');
        var pwd = crypto.randomBytes(20).toString('hex');
        var hash = await bcrypt.hash(pwd, 10);

        var user = await users.create({
            nom_user: req.body.username,
            email: req.body.email,
            password: hash,
            role_id: req.body.role,
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 172800000, // 48H en ms
        });

        // send email to client
        sentMail.createAccount(req, res, token);
    }
};

exports.logout = (req, res, next) => {
    req.app.set('token', null);
    req.app.set('user', null);
    req.session.destroy();
    delete req.session;
    res.redirect('/');
};

exports.forgotPwd = (req, res, next) => {
    res.render('auth/forgotPwd', { title: 'Mot de passe oublié'});
}

exports.forgotPwdSend = async (req, res, next) => {
    var user = await users.findOne({ where: { email: req.body.email } });

    if(!user) {
        req.flash('error', 'Cet email n\'existe pas.');
        res.redirect('/forgotPwd');
    }else {
        var token = crypto.randomBytes(40).toString('hex');
        var user = await users.update({
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 172800000, // 48H en ms
        }, {
            where: { email: req.body.email }
        });
    }

    sentMail.resetPwd(req, res, token);
}

exports.resetPwd = async (req, res, next) => {
    var token = req.params.token;
    var user = await users.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
                [Op.gte]: Date.now()
            }
        }
    });

    if (!user) {
      req.flash('error', 'Le lien est invalide ou a expiré.');
      res.redirect('/forgotPwd');
    }

    res.render('auth/resetPwd', { title: 'Réinitialisation du mot de passe', user: user });
}

exports.resetPwdSend = async (req, res, next) => {
    var token = req.params.token;
    var user = await users.findOne({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
                [Op.gte]: Date.now()
            },
            email: req.body.email
        }
    });
    if (!user) {
      req.flash('error', 'Le lien est invalide ou a expiré.');
      res.redirect('back');
    }
    if (req.body.password != req.body.passwordRepeat) {
        req.flash('error', 'Les mots de passes de correspondent pas.');
        res.redirect('/reset/'+token);
    }else {
        var hash = await bcrypt.hash(req.body.password, 10);

        var user = await users.update({
            resetPasswordToken: null,
            resetPasswordExpires: null,
            password: hash
        }, {
            where: { email: req.body.email }
        });
        req.flash('success', 'Mot de passe modifié avec succès.');
        res.redirect('/');
    }
}
