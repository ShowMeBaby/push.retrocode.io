import confirm from "./confirm.js"
/**
 * @description 拨打电话
 * @param {String} phoneNumber 拨打电话
 * */
function makePhoneCall(phoneNumber) {
  return confirm(`确认拨打: ${phoneNumber} 吗?`).then(() => {
    return new Promise((resolve, reject) => {
      uni.makePhoneCall({
        phoneNumber: phoneNumber,
        success: resolve,
        fail: reject
      });
    });
  });
}
export default makePhoneCall
