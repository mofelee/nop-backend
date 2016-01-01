'use strict';
const co = require('co');
const _  = require('lodash');
const readAllPosts = require('../helpers/read-all-posts');
const moment = require('moment');
const pinyin = require('pinyin');

exports.seed = function(knex) {
  return co(function*() {
    let posts = yield readAllPosts;

    const dbPosts = yield knex('posts').select('uuid', 'hash');

    // 增量更新，过滤已经有的post
    posts = posts.filter(function(post) {
      const postExists = _.find(dbPosts, {
        uuid: post.attributes.uuid
      });

      // 如果uuid不存在，则保留此post
      if (!postExists){
        return true;
      }

      // 如果hash不相同，文件内容有变化，则保留此post
      if (postExists.hash !== post.attributes.hash){
        return true;
      }

      return false;
    });

    posts = posts.map((post) => {
      if (!post.attributes.link) {
        // 标题转拼音
        const link = pinyin(post.attributes.title, {
          style: pinyin.STYLE_NORMAL
        }).join('-');

        post.attributes.link = link.replace(/\s+/g, '-').toLowerCase();
      }

      return {
        uuid         : post.attributes.uuid,
        hash         : post.attributes.hash,
        title        : post.attributes.title,
        link         : post.attributes.link,
        content      : post.body,
        'post_created_at' : moment(post.attributes.date).toDate(),
        'created_at' : knex.fn.now()
      };
    });

    yield knex('posts').insert(posts);
  });
};
