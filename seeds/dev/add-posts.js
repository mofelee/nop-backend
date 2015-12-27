'use strict';
const co = require('co');
const readAllPosts = require('../helpers/read-all-posts');
const moment = require('moment');
const Promise = require('bluebird');

exports.seed = function(knex) {
  return co(function*(){
    let posts = yield readAllPosts;

    yield knex('posts').del();
    posts = Promise.map(posts, function(post){
      return knex('posts').insert({
        title: post.attributes.title,
        detail: post.body,
        'created_at': moment(post.attributes.date).toDate()
      });
    });
    yield Promise.all(posts);
  });
};
