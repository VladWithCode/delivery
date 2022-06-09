process.env.NODE_ENV !== 'production' && require('dotenv').config();

// Modules
const express = require('express');
const session = require('express-session');
const sessionStorage = require('connect-mongodb-session');
const cookieParser = require('cookie-parser');
const busboyBodyParser = require('busboy-body-parser');
const cors = require('cors');
const compression = require('compression');
const passport = require('passport');

// expressjs app
const app = express();

// Config
require('./config/db');
require('./config/passport');

// Import required Enviroment Vars
const {
  PORT,
  COOKIE_SECRET,
  CORS_ORIGIN,
  DEBUG,
  DB_URI,
  SESSION_SECRET,
} = require('./config/env');
const { PUBLIC_DIR } = require('./config/globals');

const mdbStore = new (sessionStorage(session))(
  {
    collection: 'sessions',
    uri: DB_URI,
    expires: 1000 * 60 * 60 * 24,
  },
  err => {
    if (err) throw err;
  }
);

// Route Imports
const publicRoutes = require('./routes/public.routes');
const protectedRoutes = require('./routes/protected.routes');
const privateRoutes = require('./routes/private.routes');

// Settings
app.set('public', PUBLIC_DIR);
app.set('port', PORT);

// Middlewares
app.use(
  cors({
    origin: CORS_ORIGIN || '*',
    credentials: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  })
);
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(busboyBodyParser({ limit: '30mb', multi: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
      sameSite: 'strict',
    },
    store: mdbStore,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(compression({ threshold: 1000 }));

// If on development enviroment, use morgan
if (DEBUG) {
  app.use(require('morgan')('dev'));
}

// Routes
app.use('/api/public', publicRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/private', privateRoutes);

// Static Files
app.use('/files', express.static(app.get('public')));

// Error Handling
app.use((error, _req, res, _next) => {
  if (res.headersSent) return;

  const response = {
    status: 'SERVER_ERROR',
    message: error.message || 'Ocurrion un error interno en el servidor.',
  };

  if (DEBUG) {
    console.error(error);
    response.error = error;
  }

  if (error.name === 'MongoError') {
    response.status = 'DB_ERROR';
    response.message = `'Ocurrio un error con la base de datos'`;
  }

  if (error.name === 'ValidationError') {
    response.status = 'VALID_ERROR';
    response.message = `Hubo un error al registrar el documento en la base de datos. La información proporcionada no es válida`;
  }

  return res.status(500).json(response);
});

// Startup
app.listen(
  app.get('port'),
  () => DEBUG && console.log(`Server listening on port: ${app.get('port')}`)
);
