const nodemailer = require('nodemailer');

exports.resetPwd = async (req, res, token) => {
    var smtpTransport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xxxx',
            pass: 'xxxx'
        }
    });

    var mailOptions = await {
        to: req.body.email,
        from: 'xxxx',
        subject: 'Réinitialisation de mot de passe',
        text: 'Vous recevez cet e-mail car vous avez demandé une réinitialisation de mote de passe pour votre compte.\n'+
            'Merci de cliquer sur le lien si dessous ou de le coller dans votre barre de navigation pour compléter le processus :\n\n'+
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'Si vous n\'avez pas fait de demande de réinitialisation, ignorez cet e-mail, votre mot de passe restera inchangé.\n'
    };

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            req.flash('error', 'Erreur lors de l\'envoie du mail, veuillez réessayer');
            res.redirect('/forgotPwd');
        } else {
            req.flash('success', 'Un e-mail a été envoyé à l\'adresse ' + req.body.email + '.');
            res.redirect('/forgotPwd');
        }
    });
};

exports.createAccount = async (req, res, token) => {
    var smtpTransport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'xxxx',
            pass: 'xxxx'
        }
    });

    var mailOptions = await {
        to: req.body.email,
        from: 'xxxx',
        subject: 'Création de votre compte',
        text: 'Vous recevez cet e-mail car un compte vous a été créé par un administrateur de la société pour la certification ISO.\n'+
            'Merci de cliquer sur le lien si dessous ou de le coller dans votre barre de navigation pour compléter le processus :\n\n'+
            'http://' + req.headers.host + '/reset/' + token + '\n\n'
    };

    smtpTransport.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            req.flash('error', 'Erreur lors de l\'envoie du mail, veuillez réessayer');
            res.redirect('/signup');
        } else {
            req.flash('success', 'Un e-mail a été envoyé à l\'adresse ' + req.body.email + '.');
            res.redirect('/signup');
        }
    });
};
