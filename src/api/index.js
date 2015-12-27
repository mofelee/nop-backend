'use strict';
const libs = require('../libs');
const helpers = require('../helpers');
const knex = helpers.knex;
const Router = libs.Router;

module.exports = function(app) {
  const api = Router({
    prefix: '/api'
  });

  api.get('/', function*(){
    this.body = 'api';
  });

  api.use(require('./posts')(libs, helpers, knex));

  app
    .use(api.routes())
    .use(api.allowedMethods());

  app.use(api.routes());
};
