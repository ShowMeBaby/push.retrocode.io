/**
 * https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
 * 腾讯位置服务SDK
 * */
import {
  qqMapKey
} from '../../../config.js';
const QQMapWX = require('./qqmap-wx-jssdk.min.js');
const qqmapsdk = new QQMapWX({
  key: qqMapKey
});
/**
 * @description 逆地址解析
 * @param {String} latitude 纬度
 * @param {String} longitude 经度
 * */
function reverseGeocoder(latitude = '', longitude = '') {
  return new Promise((resolve, reject) => {
    const location = latitude + ',' + longitude == ',' ? '' : latitude + ',' + longitude;
    qqmapsdk.reverseGeocoder({
      location: location,
      success: resolve,
      fail: reject
    })
  });
}
module.exports = {
  reverseGeocoder
}
