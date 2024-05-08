'use strict';

require('dotenv').config();
const { sequelize } = require('./src/auth/models/index.js');
const { app } = require('./src/server.js')

// make sure our tables are created, start up the HTTP server.
sequelize.sync()
  .then(() => {
    // const app = require('./app.js').app;
    app.listen(3000, () => console.log('server up'));
  }).catch(e => {
    console.error('Could not start server', e.message);
  });