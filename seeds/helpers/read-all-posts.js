'use strict';
const crypto = require('crypto');
const co = require('co');
const Promise = require('bluebird');
const fm = require('front-matter');

const recursive = Promise.promisify(require('recursive-readdir'));
const readFile = Promise.promisify(require('fs').readFile);

const path = require('path');
const postPath = path.resolve(__dirname, '../../posts');


const postContents = co(function*() {
  let files = [];

  try {
    const fileNames = yield recursive(postPath);

    files = Promise.map(fileNames, function(file){
      return readFile(file, 'utf8');
    });

    files = Promise.map(files, function(data){
      const file = fm(data);

      file.attributes.hash = crypto.createHash('md5').update(data).digest('hex');
      return file;
    });
    // files = yield files;
  } catch (err) {
    throw err;
  }

  return files;
});

// postContents.then(function(data){
//   console.log(data);
// });

module.exports = postContents;
