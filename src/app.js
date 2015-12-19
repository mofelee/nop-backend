const app = require('koa')();

app.use(async (ctx, next) => {
  const start = new Date;
  await next();
  const ms = new Date - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(ctx => {
  ctx.body = 'Hello World';
});

const port = process.env.PORT || 6060;
app.listen(port, () => console.log(`✅  Listening on port ${port}...`));
