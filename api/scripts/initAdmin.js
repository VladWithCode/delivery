const bcrypt = require('bcrypt');
const mongoose = require('../config/db');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

async function initAdmin() {
  const existingAdmin = await User.findOne({ role: 'admin' }).lean();

  if (!isEmptyObject(existingAdmin)) {
    console.warn('Ya existe un usuario administrador.');
    return process.exit(0);
  }

  const admin = new User({
    fullname: 'admin',
    username: 'admin',
    role: 'admin',
  });

  const [hashedPass, hashError] = await asyncHandler(bcrypt.hash('admin', 10));

  if (hashError) {
    console.error('Ocurrio un error al intentar cifrar la contraseña.');
    console.error(hashError);
    return process.exit(1);
  }

  admin.password = hashedPass;

  const [, saveError] = await asyncHandler(admin.save());

  if (saveError) {
    console.error('Ocurrio un error al guardar el usuario');
    console.error(saveError);
    return process.exit(1);
  }

  console.log(
    "Se guardo con exito el usuario con nombre de usuario 'admin' y contraseña 'admin'"
  );
  process.exit(0);
}

function isEmptyObject(o) {
  if (!o || Object.keys(o).length === 0) return true;

  return false;
}

initAdmin();
