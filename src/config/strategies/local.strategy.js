const passport = require('passport');
const { Strategy } = require('passport-local');

const debug = require('debug')('app:local.strategy');

const mongo = require('./../../util/mongo');

function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    (async function getUser() {
      const user = await mongo.getUser(username);

      debug(`Authenticating user ${username}`);
      if (user && user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    }());
  }));
}

module.exports = localStrategy;
