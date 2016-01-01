'use strict';
const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin');
const handlebars = require('handlebars');
const uuid = require('node-uuid');
const moment = require('moment-timezone');
// 取出动作和参数
const args = process.argv.slice(2);

const actions = {
  newpost: newpost
};

actions[args[0]].apply(null, args.slice(1));


// actions define

function newpost(title) {
  const templatePath = path.resolve(__dirname, './new-post.md');
  const currentDatetime = moment().tz('Asia/ShangHai');
  const fileName = pinyin(title, { style: pinyin.STYLE_NORMAL }).join('-');
  const targetPath = path.resolve(__dirname, '../posts/' + currentDatetime.format('YYYY-MM'));
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  const ctx = {
    uuid: uuid.v4(),
    title: title,
    datetime: currentDatetime.format(),
    link: fileName
  };

  try {
    fs.mkdirSync(targetPath);
  } catch (err){
    console.log(err.message);
  }

  fs.writeFileSync(targetPath + '/' + fileName + '.md', template(ctx));
}
