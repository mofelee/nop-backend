'use strict';
const co = require('co');
const readAllPosts = require('../helpers/read-all-posts');
const moment = require('moment');
const Promise = require('bluebird');
const pinyin = require('pinyin');

exports.seed = function(knex) {
  return co(function*() {
    let posts = yield readAllPosts;

    yield knex('posts').del();
    posts = Promise.map(posts, function(post) {
      if (!post.attributes.link) {
        // 标题转拼音
        const link = pinyin(post.attributes.title, {
          style: pinyin.STYLE_NORMAL
        }).join('-');

        post.attributes.link = link.replace(/\s+/g, '-').toLowerCase();
      }

      return knex('posts').insert({
        uuid         : post.attributes.uuid,
        title        : post.attributes.title,
        link         : post.attributes.link,
        content      : post.body,
        'created_at' : moment(post.attributes.date).toDate()
      });
    });
    yield Promise.all(posts);
  });
};
