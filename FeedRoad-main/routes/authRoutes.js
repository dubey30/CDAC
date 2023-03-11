const passport = require('passport');


module.exports = (app) => {

    //routing where user will be pushed for oAuth flow
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    //route handler for accepting code sent after granting permission by google
    //app.get('/auth/google/callback', passport.authenticate('google'));

    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/surveys");
        }
    );

    //route handler for handling logouts
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    //route handler for testing auth flow
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};