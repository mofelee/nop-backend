'use strict';
const co = require('co');
const readAllPosts = require('../helpers/read-all-posts');
const moment = require('moment');
const Promise = require('bluebird');
const pinyin = require('pinyin');

exports.seed = function(knex) {
  return co(function*(){
    let posts = yield readAllPosts;

    yield knex('posts').del();
    posts = Promise.map(posts, function(post){
      let link = pinyin(post.attributes.title, {
        style: pinyin.STYLE_NORMAL
      }).join('-');

      link = link.replace(/\s+/g, '-').toLowerCase();

      return knex('posts').insert({
        title: post.attributes.title,
        link: link,
        detail: post.body,
        'created_at': moment(post.attributes.date).toDate()
      });
    });
    yield Promise.all(posts);
  });
};
