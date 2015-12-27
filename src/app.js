'use strict';
const koa = require('koa');
const app = koa();

const libs = require('./libs');

app.use(libs.koaFavicon());
app.use(libs.koaLogger());
app.use(libs.koaResponseTime());
app.use(libs.koaCompress());
app.use(libs.koaBodyParser());

require('./api')(app);

app.listen(3000);
console.log('listening on port 3000');

module.exports = app;
