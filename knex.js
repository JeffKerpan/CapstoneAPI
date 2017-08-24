'use strict';

const enviornment = process.env.NODE_ENV || 'development';

const knexConfig = require('./knexfile')[enviornment];

const knex = require('knex')(knexConfig);

module.exports = knex;
