'use strict';

module.exports = function(libs, helpers, knex){
  const router = libs.Router({
    prefix: '/posts'
  });

  router
    .get('/', index)
    .get('/:id', show);

  function* index(){
    const posts = yield knex
      .raw(`SELECT t.id, t.uuid, t.hash, t.title, t.content, t.post_created_at, t.created_at
            FROM (
                  SELECT uuid, MAX(created_at) as latest_date
                  FROM posts
                  GROUP BY uuid
            ) r
            INNER JOIN posts t
            on t.uuid = r.uuid AND t.created_at = r.latest_date`);

    this.body = posts[0];
  }

  function* show(){
    const posts = yield knex('posts')
                    .where('id', this.params.id);

    this.body = posts[0];
  }

  return router.routes();
};
