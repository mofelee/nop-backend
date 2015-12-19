const debug = require('debug')('lib');

debug('加载外部库');

module.exports = {
  koa      : require('koa'),
  co       : require('co'),
  moment   : require('moment'),
  thunkify : require('thunkify'),
  lodash   : require('lodash'),
  knex     : require('knex'),

  // 公共中间件
  koaSend           : require('koa-send'),
  koaResponseTime   : require('koa-response-time'),
  koaLogger         : require('koa-logger'),
  koaCompress       : require('koa-compress'),
  koaMount          : require('koa-mount'),
  koaFavicon        : require('koa-favicon'),
  koaStaticServe    : require('koa-static'),
  Router            : require('koa-router'),
  koaBodyParser     : require('koa-bodyparser'),
  koaPassport       : require('koa-passport'),
  koaGenericSession : require('koa-generic-session'),
  koaRedis          : require('koa-redis')
};

debug('外部库加载完毕');
