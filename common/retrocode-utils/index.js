/*
 * @Description: retrocode-utils工具库 v0.0.1
 * @Author: retrocode
 * @Email retrocode@qq.com
 * @Date 2020-05-21 17:30:31
 * @LastEditTime: 2020-05-21 17:30:31
 * @instruction: todo
 * @github: todo
 */
import functions from './js_sdk/function';
import uni from './js_sdk/uni';
import native from './js_sdk/native';
import open from './js_sdk/open';
module.exports = {
  native,
  open,
  ...uni,
  ...functions
}
