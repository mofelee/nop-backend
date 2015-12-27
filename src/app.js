const koa = require('koa');
const app = koa();

// logger

app.use(function*(next) {
  const start = new Date();

  yield next;
  const ms = new Date() - start;

  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function*() {
  this.body = 'Hello World!';
});

app.listen(3000);
