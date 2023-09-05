const { Router } = require('express');
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
  router.post('/login', async (req, res, next) => {
    try {
      const errors = [];

      const user = await UserService.findByUsername(req.body.username);

      if (!user) {
        errors.push('username');
        errors.push('password');
        req.session.messages.push({
          text: 'Invalid username or password!',
          type: 'danger',
        });
      } else if (user && !user.verified) {
        errors.push('username');
        errors.push('password');
        req.session.messages.push({
          text: 'Please verify your email address!',
          type: 'danger',
        });
      } else {
        const isValid = await user.comparePassword(req.body.password);

        if (!isValid) {
          errors.push('username');
          errors.push('password');
          req.session.messages.push({
            text: 'Invalid username or password!',
            type: 'danger',
          });
        }
      }

      if (errors.length) {
        // Render the page again and show the errors
        return res.render('auth/login', {
          page: 'login',
          data: req.body,
          errors,
        });
      }

      req.session.userId = user.id;
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

      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  });

  /**
   * GET route to log a user out
   * @todo: Implement
   */
  router.get('/logout', (req, res) => {
    req.session.userId = null;
    req.session.rememberMe = null;
    req.session.messages.push({
      text: 'You are logged out!',
      type: 'info',
    });

    return res.redirect('/');
  });

  return router;
};
