const express = require('express');
const passport = require('passport')
const UserModel = require('../../models/UserModel')
const middlewares = require('../middlewares')

const router = express.Router();

function redirectIfLoggedIn (req, res, next) {
  if (!req.user) return next()
  return res.redirect('/users/account')
}

module.exports = (params) => {
  const { avatars } = params

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?error=true',
  }))

  router.get('/login', redirectIfLoggedIn, (req, res) => res.render('users/login', { error: req.query.error }))

  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return next(err)
      res.redirect('/')
    })
  })

  router.get('/registration', redirectIfLoggedIn, (req, res) => res.render('users/registration', { success: req.query.success }));

  router.post(
    '/registration',
    middlewares.upload.single('avatar'),
    middlewares.handleAvatar(avatars),
    async (req, res, next) => {
      const file = req.file
      const storedFilename = file?.storedFilename

      try {
        const { username, email, password } = req.body

        const user = new UserModel({
          username,
          email,
          password,
        })

        if (file && storedFilename) {
          user.avatar = storedFilename
        }

        const saved = await user.save()

        if (saved) return res.redirect('/users/registration?success=true')

        return next(new Error('Failed to save user for unknown reasons'))
      } catch (err) {
        if (file && storedFilename) {
          await avatars.delete(storedFilename)
        }
        return next(err)
      }
    },
  )

  router.get('/account', (req, res, next) => {
    if (req.user) return next()
    return res.redirect('login')
  }, (req, res) => res.render('users/account', { user: req.user }));

  router.get('/avatar/:filename', (req, res) => {
    res.type('png')
    return res.sendFile(avatars.filepath(req.params.filename))
  })

  router.get('/avatartn/:filename', async (req, res) => {
    res.type('png')
    const thumbnail = await avatars.thumbnail(req.params.filename)
    return res.end(thumbnail, 'binary')
  })

  return router;
};
