'use strict';

module.exports = function(libs, helpers, knex){
  const router = libs.Router({
    prefix: '/posts'
  });

  router
    .get('/', index)
    .get('/:id', show);

  function* index(){
    this.body = yield knex('posts').select();
  }

  function* show(){
    const posts = yield knex('posts')
                    .where('id', this.params.id);

    this.body = posts[0];
  }

  return router.routes();
};
