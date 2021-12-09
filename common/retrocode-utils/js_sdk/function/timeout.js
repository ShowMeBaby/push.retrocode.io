/**
 * Promise化的setTimeout函数
 * @param String ms 毫秒值
 */
function timeout(ms = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

export default timeout
