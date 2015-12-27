'use strict';
const config = require('../config')();

module.exports = {
  knex: require('knex')(config.knexConfig)
};
