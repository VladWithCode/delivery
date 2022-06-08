const passport = require('passport');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { isEmptyObject } = require('../utils/helpers');

const ctrl = {};

ctrl.check = (req, res) => {
  if (!req.isAuthenticated())
    return res.json({
      authenticated: false,
    });

  return res.json({
    authenticated: true,
  });
};

ctrl.signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingUser = await User.exists({
    $or: [{ email }, { username }],
  });

  if (existingUser && !isEmptyObject(existingUser))
    return res.status(400).json({
      status: 'CUSTOMER_EXISTS',
      message: `El usuario ${username} o el correo ${email} ya está registrado`,
    });

  const user = new User({
    username,
    email,
    password,
  });

  const [, saveError] = await asyncHandler(user.save());

  if (saveError) return next(saveError);

  req.logIn(user, err => {
    if (err) return next(err);

    return res.json({
      status: 'OK',
      user,
    });
  });
};

ctrl.signIn = async (req, res, next) => {
  passport.authenticate(
    'local.signin',
    {
      successRedirect: false,
      failureRedirect: false,
    },
    async (err, user, info) => {
      if (err) return next(err);

      if (!user)
        return res.json({
          status: 'WRONG_USER',
          message: `Usuario no registrado`,
        });

      if (!(await user.validatePass(req.body.password)))
        return res.json({
          status: 'WRONG_PASS',
          message: `Contraseña incorrecta`,
        });

      req.logIn(user, loginError => {
        if (loginError) return next(loginError);

        return res.json({
          status: 'OK',
          message: 'Autenticado con exito',
          user,
        });
      });
    }
  )(req, res, next);
};

ctrl.signOut = async (req, res, next) => {
  res.clearCookie('session-id');

  req.logout();
  req.session.destroy(null);

  return res.json({
    status: 'OK',
    message: `Sesión terminada con exito.`,
  });
};

module.exports = ctrl;
