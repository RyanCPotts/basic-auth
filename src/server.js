'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('./auth/models/index.js')

const app = express();
// Process JSON input and put the data on req.body
app.use(express.json());
// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Import the basicAuth middleware function from basic.js
const basicAuth = require('./auth/middleware/basic');

// Signup Route -- create a new user
app.post('/signup', async (req, res) => {

  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const record = await Users.create(req.body);
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});
// Signin Route -- login with username and password
app.post('/signin', basicAuth, async (req, res) => {
  // Logic for sign-in route
  res.status(200).json(req.user);
});


module.exports = { app };