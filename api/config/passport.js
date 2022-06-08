const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

passport.serializeUser((_, user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const [admin, findError] = await asyncHandler(
    User.findById(id).select({ password: 1 })
  );

  if (findError) return done(findError, false);

  if (!admin) return done('pass');

  return done(null, admin);
});

// User signin strategy
passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'user',
      passwordField: 'pass',
    },
    async (username, password, done) => {
      const [admin, findError] = await asyncHandler(
        User.findOne({ username }).lean()
      );

      if (findError)
        return done(findError, false, { message: 'Error al iniciar sesión' });

      if (!admin) {
        return done(undefined, false, {
          message: `El usuario ${username} no existe.`,
        });
      }

      return done(undefined, admin);
    }
  )
);
