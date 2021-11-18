const { Router } = require('express');
const { getLogin, postLogin, failedLogin } = require('../controllers/login.controller');
const { UsuarioFacebookModelo } = require('../models/UsuarioFacebook');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { PORT } = require('../config/config');

const loginRouter = Router();

passport.use('facebook', new FacebookStrategy({
    clientID: '433665011494042',
    clientSecret: '07ee327724d96ea2b0e20f66e0d810e3',
    callbackURL: `https://localhost:${PORT}/login/facebook`
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken, profile)
    UsuarioFacebookModelo.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

loginRouter.get('/', getLogin);
loginRouter.post('/', passport.authenticate('facebook', {failureRedirect: '/login/failed'}), postLogin);
loginRouter.get('/facebook', passport.authenticate('facebook', {failureRedirect: '/login/failed'}, postLogin));
loginRouter.get('/failed', failedLogin);

module.exports = {
    loginRouter
}

/*

FacebookStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        UsuarioModelo.findOne({'username': username}, (err,user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, console.log('Usuario no encontrado'));
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, console.log('Invalid password'));
            }
            return done(null, user);
        })
    }
)

*/