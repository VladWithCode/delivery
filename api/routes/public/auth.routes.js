const {
  signIn,
  signOut,
  signUp,
  check,
  getCurrentUser,
} = require('../../controllers/auth.ctrl');

const Router = require('express').Router;

const router = Router();

router.get('/current', getCurrentUser);

router.get('/', check);

router.post('/', signUp);

router.put('/', signIn);

router.delete('/', signOut);

module.exports = router;
