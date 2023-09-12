const passport = require('passport');
const {
  Strategy: JWTStrategy,
  ExtractJwt: ExtractJWT,
} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const UserService = require('../../services/UserService');

/**
 * This module sets up and configures passport
 * @param {*} config
 */
module.exports = (config) => {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await UserService.findByUsername(req.body.username);

          if (!user) {
            req.session.messages.push({
              text: 'Invalid username or password!',
              type: 'danger',
            });
            return done(null, false);
          }

          if (user && !user.verified) {
            req.session.messages.push({
              text: 'Please verify your email address!',
              type: 'danger',
            });
            return done(null, false);
          }

          const isValid = await user.comparePassword(req.body.password);

          if (!isValid) {
            req.session.messages.push({
              text: 'Invalid username or password!',
              type: 'danger',
            });
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_SECRET,
      },
      async ({ userId }, done) => {
        try {
          const user = await UserService.findById(userId);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    new GithubStrategy(
      {
        clientID: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
        scope: ['user:email'],
        callbackURL: 'http://localhost:3000/auth/github/callback',
        passReqToCallback: true,
      },
      async (
        req,
        accessToken,
        refreshToken,
        { provider, id: profileId },
        done,
      ) => {
        try {
          req.session.tempOAuthProfile = null;

          const user = await UserService.findByOAuthProfile(
            provider,
            profileId,
          );

          if (!user) {
            req.session.tempOAuthProfile = {
              provider,
              profileId,
            };
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserService.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  });

  return passport;
};
