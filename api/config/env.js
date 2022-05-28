const env = {};

env.CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',');

env.NODE_ENV = process.env.NODE_ENV || 'development';

env.DEBUG = process.env.DEBUG || false;

env.PORT = process.env.PORT || 3030;

env.DB_URI = process.env.DB_URI;

env.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';

env.PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';

env.SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretsecret';

env.COOKIE_SECRET = process.env.COOKIE_SECRET || 'keyboardcatcookies';

env.STRIPE_SK =
  process.env.STRIPE_SK ||
  'sk_test_51L45U5JGXk3T3M1Je5jCAQRpntus6uT8JP65PJSpOPdbXYhNocQ0FXpycxhraNF5EYFKUpJpGuZj5NFCyVhJjLpZ00zxh2G5Y8';

module.exports = env;
