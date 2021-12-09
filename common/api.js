import {
  apiBaseUrl,
  apisec
} from './config.js';
import toast from './retrocode-utils/js_sdk/uni/toast.js' //引入common
const post = (method, data) => {
  return new Promise(async (resolve, reject) => {
    data = data ? data : {};
    uni.showLoading({
      title: '加载中'
    });
    // 获取用户token
    data.token = apisec;
    data.method = method;
    const [error, response] = await uni.request({
      url: apiBaseUrl + 'api.php' + method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      timeout: 20000,
      method: 'POST'
    });
    // console.log('=================================');
    // console.log(data);
    // console.log(error);
    // console.log(response);
    // console.log('=================================');
    uni.hideLoading();
    if (error) {
      showError(error);
      reject();
      return;
    }
    if (response.statusCode != 200) {
      showError(response);
      reject();
      return;
    }
    const result = response.data;
    resolve(result.data);
  });
}



const showError = error => {
  let errorMsg = ''
  switch (error.statusCode) {
    case 400:
      errorMsg = '请求参数错误'
      break
    case 401:
      errorMsg = '未授权，请登录'
      break
    case 403:
      errorMsg = '跨域拒绝访问'
      break
    case 404:
      errorMsg = `请求地址出错: ${error.config.url}`
      break
    case 408:
      errorMsg = '请求超时'
      break
    case 500:
      errorMsg = '服务器内部错误'
      break
    case 501:
      errorMsg = '服务未实现'
      break
    case 502:
      errorMsg = '网关错误'
      break
    case 503:
      errorMsg = '服务不可用'
      break
    case 504:
      errorMsg = '网关超时'
      break
    case 505:
      errorMsg = 'HTTP版本不受支持'
      break
    default:
      errorMsg = error.errMsg
      break
  }
  toast(errorMsg);
  // uni.showToast({
  //   title: errorMsg,
  //   icon: 'none',
  //   duration: 3000
  // });
}

const _uploadFile = async (file_type, tmpPath) => {
  uni.showLoading({
    title: '上传中...'
  });
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: apiBaseUrl + 'api.html',
      filePath: tmpPath,
      fileType: file_type == 0 ? 'image' : 'video',
      name: 'file',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      formData: {
        method: 'images.upload',
        upfile: tmpPath,
        file_type: file_type
      },
      success: (uploadFileRes) => {
        resolve(JSON.parse(uploadFileRes.data).data);
      },
      fail: (error) => {
        if (error && error.response) {
          showError(error.response);
          reject();
        }
      },
      complete: () => {
        setTimeout(function() {
          uni.hideLoading();
        }, 250);
      }
    });
  });
}


// 图片上传
export const uploadFiles = (file_type = 'image', {
  // 图片选择参数
  count = 1
} = {
  count: 1
}) => {
  file_type = file_type == 'image' ? 0 : 1; // 0 图片 1 视频
  return new Promise((resolve, reject) => {
    if (file_type == 0) {
      // 选择图片
      uni.chooseImage({
        count: count,
        success: chooseImageRes => {
          resolve(chooseImageRes.tempFilePaths);
        }
      });
    } else {
      // 选择视频
      uni.chooseVideo({
        compressed: true, // 默认压缩视频文件
        maxDuration: 60, // 最大拍摄时长/秒
        sourceType: ['album', 'camera'],
        success: chooseVideoRes => {
          if (chooseVideoRes.duration > 120) {
            uni.showToast({
              title: '视频时长超过120秒,无法上传'
            });
            reject();
          } else {
            resolve([chooseVideoRes.tempFilePath]);
          }
        }
      });
    }
  }).then(tmpPaths => {
    return new Promise(async (resolve, reject) => {
      const result = [];
      for (var i = 0; i < tmpPaths.length; i++) {
        const tmpPath = tmpPaths[i];
        const data = await _uploadFile(file_type, tmpPath);
        result.push(data);
      }
      resolve(result);
    });
  });
}


// 提交设备CID
export const savecid = data => post('/push/savecid', data);
// 获取推送列表
export const getlist = data => post('/push/getlist', data);
// 获取未读条数
export const unreadnum = data => post('/push/unreadnum', data);
// 清除未读
export const allread = data => post('/push/allread', data);
// 获取推送详情
export const getinfo = data => post('/push/getinfo', data);
