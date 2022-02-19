const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.app.get('token');
    if (!token) {
        return res.redirect('/');
    }
    try {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        var user = req.app.get('user');

        if (user.id_user !== userId) {
            if (user.users_role.role != "relais" || user.users_role.role != "admin") {
                return res.render('unauthorized',{ title: 'unauthorized' });
            }else {
                next();
            }

        } else {
            next();
        }

    } catch (e) {
        return res.render('unauthorized',{ title: 'unauthorized' });
    }
};
