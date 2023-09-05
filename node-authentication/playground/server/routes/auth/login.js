const { Router } = require('express');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const UserService = require('../../services/UserService');

const router = Router();

module.exports = () => {
  /**
   * GET route to display the login form
   */
  router.get('/login', (req, res) => {
    res.render('auth/login', { page: 'login' });
  });

  /**
   * POST route to process the login form or display it again along with an error message in case validation fails
   */
  router.post(
    '/login',
    passport.authenticate('local', {
      failureRedirect: '/auth/login',
    }),
    async (req, res, next) => {
      try {
        req.session.messages.push({
          text: 'You are logged in!',
          type: 'success',
        });

        if (req.body.remember) {
          req.sessionOptions.maxAge = 24 * 60 * 60 * 1000 * 14;
          req.session.rememberMe = req.sessionOptions.maxAge;
        } else {
          req.sessionOptions.maxAge = null;
        }

        return res.redirect(req.session.returnTo || '/');
      } catch (err) {
        return next(err);
      }
    },
  );

  /**
   * GET route to log a user out
   * @todo: Implement
   */
  router.get('/logout', (req, res) => {
    req.logOut();
    req.session.rememberMe = null;
    req.session.messages.push({
      text: 'You are logged out!',
      type: 'info',
    });

    return res.redirect('/');
  });

  return router;
};
