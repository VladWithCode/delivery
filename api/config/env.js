const env = {};

env.CORS_ORIGIN = ['http://localhost:3000', 'http://127.0.0.1:3000'];

env.NODE_ENV = process.env.NODE_ENV || 'development';

env.DEBUG = process.env.DEBUG || false;

env.PORT = process.env.PORT || 3030;

env.DB_URI = process.env.DB_URI;

env.PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';

env.PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET || '';

env.SESSION_SECRET = process.env.SESSION_SECRET || 'supersecretsecret';

env.COOKIE_SECRET = process.env.COOKIE_SECRET || 'keyboardcatcookies';

env.STRIPE_SK = process.env.STRIPE_SK;

module.exports = env;
