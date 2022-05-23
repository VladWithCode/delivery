const mongoose = require('mongoose');
const { DB_URI } = require('./env');

mongoose.connect(DB_URI, err => {
  if (err) return console.error('Error connecting to DB\n', err);

  console.log('Connected to DB');
});
