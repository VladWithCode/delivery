const {
  signIn,
  signOut,
  signUp,
  checkAuth,
} = require('../../controllers/auth.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/', checkAuth);

router.post('/', signUp);

router.put('/', signIn);

router.delete('/', signOut);

module.exports = router;
