const { isEmptyObject } = require('../utils/helpers');

const ctrl = {};

ctrl.createUser = async (req, res, next) => {
  const { fullname, username, email, phone, password, role } = req.body;

  const [customerExists, existsCheckError] = await asyncHandler(
    Customer.exists({ email, username })
  );

  if (existsCheckError) return next(existsCheckError);

  if (!isEmptyObject(customerExists))
    return res.json({
      status: 'USER_EXISTS',
      message: `El email ingresado ya está en uso`,
    });

  let setRole = false;
  if (req.user?.role === 'admin') setRole = true;

  const customer = new Customer({
    fullname,
    username,
    email,
    phone,
    password,
    role: setRole ? role : 'user',
  });

  const [, saveError] = await asyncHandler(customer.save());

  if (saveError) return next(saveError);

  return res.json({
    status: 'OK',
    customer: {
      ...customer.toJSON(),
      password: undefined,
    },
  });
};

module.exports = ctrl;
