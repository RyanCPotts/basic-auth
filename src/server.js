'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

// Import the basicAuth middleware function from basic.js
const basicAuth = require('./auth/middleware/basic');

// Signin Route -- login with username and password
app.post('/signin', basicAuth, async (req, res) => {
  // Logic for sign-in route
});

// Process JSON input and put the data on req.body
app.use(express.json());

const environment = process.env.NODE_ENV;
const testOrProduction = (environment === 'test' || environment === 'production');

const sequelize = new Sequelize(process.env.DATABASE_URL, testOrProduction ? { logging: false } : {});

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Create a Sequelize model
const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Signup Route -- create a new user
app.post('/signup', async (req, res) => {
  // Logic for sign-up route
});

module.exports = { app, sequelize };