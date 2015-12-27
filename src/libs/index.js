'use strict';
const debug = require('debug')('lib');

debug('加载外部库');

module.exports = {
  knex     : require('knex'),

  // 公共中间件
  koaFavicon        : require('koa-favicon'),
  koaLogger         : require('koa-logger'),
  koaResponseTime   : require('koa-response-time'),
  koaCompress       : require('koa-compress'),
  koaBodyParser     : require('koa-bodyparser'),

  koaSend           : require('koa-send'),
  koaMount          : require('koa-mount'),
  koaStatic         : require('koa-static'),
  Router            : require('koa-router'),
  koaPassport       : require('koa-passport'),
  koaGenericSession : require('koa-generic-session'),
  koaRedis          : require('koa-redis')
};

debug('外部库加载完毕');
