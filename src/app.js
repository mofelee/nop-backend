import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});

const port = process.env.PORT || 6060;
app.listen(port, () => console.log(`✅  Listening on port ${port}...`));
