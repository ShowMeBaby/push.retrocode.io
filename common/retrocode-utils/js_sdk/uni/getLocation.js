/**
 * @description 获取当前的地理位置、速度
 * @param {String} type wgs84返回gps坐标，gcj02返回可用于openLocation的坐标
 * */
function getLocation(option = {}) {
  const {
    type = 'gcj02'
  } = option;
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: type,
      success: resolve,
      fail: reject
    });
  });
}
export default getLocation
