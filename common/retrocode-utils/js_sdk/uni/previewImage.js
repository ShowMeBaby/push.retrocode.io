/**
 * @description 预览图片
 * @param {Array<String>} urls 提示文字
 * @param {String/Number} current 当前显示图片的链接/索引值
 * */
function previewImage(urls, current = 0) {
  return new Promise((resolve, reject) => {
    uni.previewImage({
      current: current,
      urls: urls,
      success: resolve,
      fail: reject
    })
  });
}

export default previewImage
