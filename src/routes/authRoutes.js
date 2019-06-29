const express = require('express');
const passport = require('passport');

const debug = require('debug')('app:authRoutes');

const mongo = require('./../util/mongo');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { username, password } = req.body;
      debug(req.body);
      (async function createUser() {
        const user = await mongo.createUser(username, password);
        req.login(user, () => {
          res.redirect('/auth/profile');
        });
      }());
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        debug('User not logged in, redirecting');
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });

  authRouter.route('/logOut')
    .post((req, res) => {
      req.logout();
      res.redirect('/auth/profile');
    });

  return authRouter;
}

module.exports = router;
