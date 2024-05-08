const { Sequelize, DataTypes } = require('sequelize');

const userModel = require ('./user-model');

const sequelize = new Sequelize(process.env.DATABASE_URL, {dialect:"postgres"});

const userMod = userModel(sequelize, DataTypes);

module.exports = { sequelize, userModel:userMod };