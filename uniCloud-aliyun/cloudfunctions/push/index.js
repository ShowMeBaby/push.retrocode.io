'use strict';
const UniPush = require('uni-push')
exports.main = async (event, context) => {
  const res = {
    status: 'fail',
    message: 'message字段为必须值'
  }

  const db = uniCloud.database();
  const collection = db.collection('usercid');
  let usercids = await collection.orderBy("_id", "desc").get()
  if (usercids.data.length == 0) {
    return res
  }

  const clientid = usercids.data[0].cid;

  let {
    title,
    desc,
    message,
  } = event.queryStringParameters;
  if (!message) {
    return res
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
    "clientid": clientid
  })
  return {
    status: 'success',
    message: '推送成功'
  }
};
