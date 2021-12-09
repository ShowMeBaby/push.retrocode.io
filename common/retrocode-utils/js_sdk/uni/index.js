// Storage封装
import db from './db.js'
// 路由封装
import route from './route.js'
// toast提示，对uni.showToast的封装
import toast from './toast.js'
// confirm弹窗提示，对uni.showModal的封装
import confirm from './confirm.js'
// 拨打电话，对uni.makePhoneCall的封装
import makePhoneCall from './makePhoneCall.js'
// 获取当前的地理位置、速度
import getLocation from './getLocation.js'
// 打开地图选择位置
import chooseLocation from './chooseLocation.js'
// 预留图片
import previewImage from './previewImage.js'
module.exports = {
  db,
  toast,
  route,
  confirm,
  getLocation,
  previewImage,
  makePhoneCall,
  chooseLocation
}
