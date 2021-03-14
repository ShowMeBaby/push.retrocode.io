'use strict';
const UniPush = require('uni-push')
exports.main = async (event, context) => {
  let {
    title,
    desc,
    message,
  } = event.queryStringParameters;
  if (!message) {
    return {
      status: 'fail',
      message: 'message字段为必须值'
    }
  }
  if (!title) {
    title = message;
  }
  if (!desc) {
    desc = message;
  }
  await UniPush("toSingle", {
    "title": title,
    "content": desc,
    "timestamp": new Date().getTime(),
    "payload": JSON.stringify({
      "title": title,
      "content": desc,
      "data": message
    }),
    "clientid": '0922250f93e5a45c56f679517b60c597'
  })
  return {
    status: 'success',
    message: '推送成功'
  }
};
