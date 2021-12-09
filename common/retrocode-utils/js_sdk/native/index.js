import {
  ImportAndroidPackage,
  InvokeAndroidMethod
} from './uniplus.js'

/**
 * 获取wifi的mac地址
 */
function getMac() {
  try {
    const WIFI_SERVICE = 'wifi';
    const os = plus.os.name;
    if ('Android' == os) {
      const main = plus.android.runtimeMainActivity();
      const wifiService = main.getSystemService(WIFI_SERVICE);
      const wifiInfo = InvokeAndroidMethod(wifiService, 'getConnectionInfo');
      const mac = InvokeAndroidMethod(wifiInfo, 'getMacAddress');
      return mac;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getMac!!');
  }
}

/**
 * 获取手机可用内存大小
 * 单位为字节
 */
function getAvailMemory() {
  try {
    const ACTIVITY_SERVICE = 'activity';
    const os = plus.os.name;
    if ('Android' == os) {
      const ActivityManager = ImportAndroidPackage('android.app.ActivityManager');
      const mi = new ActivityManager.MemoryInfo();
      const activityService = plus.android.runtimeMainActivity().getSystemService(ACTIVITY_SERVICE);
      activityService.getMemoryInfo(mi);
      const memoryInfo = mi.plusGetAttribute('availMem');
      return memoryInfo;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getAvailMemory!!');
  }
}

/**
 * 获取手机总内存大小
 * 单位为KB
 */
function getTotalMemory() {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const memInfo = '/proc/meminfo';
      let temp = '',
        ramSize = '';
      const fileReader = ImportAndroidPackage("java.io.FileReader");
      const bufferedReader = ImportAndroidPackage("java.io.BufferedReader");
      const FileReader = new fileReader(memInfo);
      const BufferedReader = new bufferedReader(FileReader, 8192);
      while ((temp = BufferedReader.readLine()) != null) {
        if (-1 != temp.indexOf('MemTotal:')) {
          const value = temp.replace(/[^0-9]/ig, "");
          ramSize = parseInt(value);
        }
      }
      return ramSize;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getAvailMemory!!');
  }
}


/**
 * 获取CPU信息
 */
function getCpuInfo() {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const cpuInfo = '/proc/cpuinfo';
      let temp = '',
        cpuHardware;
      const fileReader = ImportAndroidPackage('java.io.FileReader');
      const bufferedReader = ImportAndroidPackage('java.io.BufferedReader');
      const FileReader = new fileReader(cpuInfo);
      const BufferedReader = new bufferedReader(FileReader, 8192);
      while ((temp = BufferedReader.readLine()) != null) {
        if (-1 != temp.indexOf('Hardware')) {
          cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1);
        }
      }
      return cpuHardware;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getCpuInfo!!');
  }
}

/**
 * 获取CPU核数
 */
function getCpuCount() {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const Runtime = ImportAndroidPackage("java.lang.Runtime");
      const cpuCount = Runtime.getRuntime().availableProcessors();
      return cpuCount;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getCpuInfo!!');
  }
}


/**
 * 打开闪光灯
 */
function onTorch() {
  try {
    const os = plus.os.name;
    if ('iOS' == os) {
      const device = plus.ios.invoke('AVCaptureDevice', 'defaultDeviceWithMediaType:', 'vide');
      plus.ios.invoke(device, 'lockForConfiguration:', null);
      plus.ios.invoke(device, 'setTorchMode:', 1);
      plus.ios.invoke(device, 'setFlashMode:', 1);
      plus.ios.invoke(device, 'unlockForConfiguration');
    } else {
      const main = plus.android.runtimeMainActivity();
      const camera = main.getSystemService('camera');
      const ids = InvokeAndroidMethod(camera, 'getCameraIdList');
      for (let i = 0; i < ids.length; i++) {
        const c = InvokeAndroidMethod(camera, 'getCameraCharacteristics', ids[i]);
        const available = InvokeAndroidMethod(c, 'get', plus.android.getAttribute(c, 'FLASH_INFO_AVAILABLE'));
        const facing = InvokeAndroidMethod(c, 'get', plus.android.getAttribute(c, 'LENS_FACING'));
        if (null != available && available && null != facing && 1 == facing) {
          InvokeAndroidMethod(camera, 'setTorchMode', ids[i], true);
        }
      }
    }
  } catch (e) {
    console.error('error @onTorch!!');
  }
}

/**
 * 关闭闪光灯
 */
function offTorch() {
  try {
    const os = plus.os.name;
    if ('iOS' == os) {
      const device = plus.ios.invoke('AVCaptureDevice', 'defaultDeviceWithMediaType:', 'vide');
      plus.ios.invoke(device, 'lockForConfiguration:', null);
      plus.ios.invoke(device, 'setTorchMode:', 0);
      plus.ios.invoke(device, 'setFlashMode:', 0);
      plus.ios.invoke(device, 'unlockForConfiguration');
    } else {
      const main = plus.android.runtimeMainActivity();
      const camera = main.getSystemService('camera');
      const ids = InvokeAndroidMethod(camera, 'getCameraIdList');
      for (let i = 0; i < ids.length; i++) {
        const c = InvokeAndroidMethod(camera, 'getCameraCharacteristics', ids[i]);
        const available = InvokeAndroidMethod(c, 'get', plus.android.getAttribute(c, 'FLASH_INFO_AVAILABLE'));
        const facing = InvokeAndroidMethod(c, 'get', plus.android.getAttribute(c, 'LENS_FACING'));
        if (null != available && available && null != facing && 1 == facing) {
          InvokeAndroidMethod(camera, 'setTorchMode', ids[i], false);
        }
      }
    }
  } catch (e) {
    console.error('error @offTorch!!');
  }
}


/**
 * 获取手机剩余存储空间,单位G。]
 * @unit m g
 */
function getInternalStorage(unit = 'm') {
  try {
    const os = plus.os.name;
    if ('iOS' == os) {
      const BundleClass = plus.ios.importClass("NSBundle");
      const BundleObj = BundleClass.mainBundle();
      const filenamagerobj = plus.ios.newObject("NSFileManager");
      const FileAttr = plus.ios.invoke(filenamagerobj, "attributesOfFileSystemForPath:error:", BundleObj.bundlePath(),
        null);
      let FreeSize = plus.ios.invoke(FileAttr, "objectForKey:", "NSFileSystemFreeSize");
      const numberFormatterObj = plus.ios.newObject("NSNumberFormatter");
      const FreeSizeStr = plus.ios.invoke(numberFormatterObj, "stringFromNumber:", FreeSize);
      FreeSize = unit == 'm' ? FreeSizeStr / 1024 / 1024 : FreeSizeStr / 1024 / 1024 / 1024;
      return FreeSize.toFixed(2);
    } else if (os == "Android") { //如果是安卓
      let internalMemSize = 0;
      let FreeSize = 0;
      const environment = ImportAndroidPackage("android.os.Environment");
      const statFs = ImportAndroidPackage("android.os.StatFs");
      ImportAndroidPackage("java.io.File");
      const Files = environment.getDataDirectory();
      const StatFs = new statFs(Files.getPath());
      const blockAva = parseFloat(StatFs.getAvailableBlocks());
      const blockSize = parseFloat(StatFs.getBlockSize());
      internalMemSize = blockSize * blockAva;
      FreeSize = unit == 'm' ? internalMemSize / 1024 / 1024 : internalMemSize / 1024 / 1024 / 1024;
      return FreeSize.toFixed(2);
    } else {
      return 'error getFileFree'
    }
  } catch (e) {
    console.error('error @getFileSystemFreeSize!!');
  }
}

/**
 * 打开系统设置页面
 * @param {String} setting 设置页面标识
 * 参考Android原生android.provider.Settings类中定义的常量
 * https://ext.dcloud.net.cn/plugin?id=1061
 * https://ask.dcloud.net.cn/question/14732
 * 在页面中引用此模块
 * import wxy from "@/common/wxy-android.js"
 * 调用模块的方法
 * wxy.open(wxy.SETTINGS);
 */
function openSetting(setting) {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const main = plus.android.runtimeMainActivity();
      const intent = plus.android.newObject('android.content.Intent', setting);
      main.startActivity(intent);
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @openSettings!!');
  }
}
const SETTINGS_PARAM = {
  SETTINGS: 'android.settings.SETTINGS',
  APN_SETTINGS: 'android.settings.APN_SETTINGS',
  LOCATION_SOURCE_SETTINGS: 'android.settings.LOCATION_SOURCE_SETTINGS',
  USER_SETTINGS: 'android.settings.USER_SETTINGS',
  WIRELESS_SETTINGS: 'android.settings.WIRELESS_SETTINGS',
  SECURITY_SETTINGS: 'android.settings.SECURITY_SETTINGS',
  PRIVACY_SETTINGS: 'android.settings.PRIVACY_SETTINGS',
  WIFI_SETTINGS: 'android.settings.WIFI_SETTINGS',
  WIFI_IP_SETTINGS: 'android.settings.WIFI_IP_SETTINGS',
  BLUETOOTH_SETTINGS: 'android.settings.BLUETOOTH_SETTINGS',
  CAST_SETTINGS: 'android.settings.CAST_SETTINGS',
  DATE_SETTINGS: 'android.settings.DATE_SETTINGS',
  SOUND_SETTINGS: 'android.settings.SOUND_SETTINGS',
  DISPLAY_SETTINGS: 'android.settings.DISPLAY_SETTINGS',
  LOCALE_SETTINGS: 'android.settings.LOCALE_SETTINGS',
  VOICE_INPUT_SETTINGS: 'android.settings.VOICE_INPUT_SETTINGS',
  INPUT_METHOD_SETTINGS: 'android.settings.INPUT_METHOD_SETTINGS',
  MANAGE_APPLICATIONS_SETTINGS: 'android.settings.MANAGE_APPLICATIONS_SETTINGS',
  DEVICE_INFO_SETTINGS: 'android.settings.DEVICE_INFO_SETTINGS',
  NOTIFICATION_SETTINGS: 'android.settings.NOTIFICATION_SETTINGS',
}

/**
 * 打开应用设置页面
 * https://ext.dcloud.net.cn/plugin?id=1061
 */
function openAppSetting() {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const main = plus.android.runtimeMainActivity();
      const intent = plus.android.newObject('android.content.Intent', 'android.settings.APPLICATION_DETAILS_SETTINGS');
      const uri = InvokeAndroidMethod('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
      InvokeAndroidMethod(intent, 'setData', uri);
      main.startActivity(intent);
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @openAppSetting!!');
  }
}

// 根据包名从应用市场下载
function androidMarket(pname) {
  plus.runtime.openURL("market://details?id=" + pname);
}

/**
 * 根据包名启动第三方应用
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} pnamestr 应用名称，如微信
 */
function openApp(pname, pnamestr) {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      plus.runtime.launchApplication({
        pname: pname
      }, function(e) {
        const str = `检查到您未安装"${pnamestr}",是否到商城搜索下载？`;
        plus.nativeUI.confirm(str, function(i) {
          if (i.index == 0) {
            androidMarket(pname);
          }
        });
      });
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @openApp!!');
  }
}

/**
 * 根据包名和行为向第三方应用发送广播
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} action 行为
 * @param {Object} data   参数，由于js没索引数组，所以以对象的形式传递参数
 * 关于Nativejs的常规API和高级API区别见https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/88
 */
function broadCast(pname, action, data = {}) {
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const main = plus.android.runtimeMainActivity();
      // 常规Nativejs API
      // let Intent = ImportAndroidPackage("android.content.Intent");
      // let intent = new Intent();
      // intent.setPackage(pname);
      // intent.setAction(action);			
      // for (let [key, value] of Object.entries(data)) {
      //   intent.putExtra(key, value);
      // }
      // 高级Nativejs API
      const intent = plus.android.newObject('android.content.Intent');
      InvokeAndroidMethod(intent, 'setPackage', pname);
      InvokeAndroidMethod(intent, 'setAction', action);
      for (let [key, value] of Object.entries(data)) {
        InvokeAndroidMethod(intent, 'putExtra', key, value);
      }
      main.sendBroadcast(intent);
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @broadCast!!');
  }
}

/**
 * 获取本机的所有安装的包名和应用程序名(过滤系统应用)
 */
function getMobileAppInfo() {
  // NativeJS实现代码
  try {
    const os = plus.os.name;
    if ('Android' == os) {
      const drawableTofile = (drawable, packageName) => {
        try {
          const drawableToBitamp = (drawable1) => {
            const w = InvokeAndroidMethod(drawable1, 'getIntrinsicWidth');
            const h = InvokeAndroidMethod(drawable1, 'getIntrinsicHeight');
            const config = InvokeAndroidMethod(drawable1, 'getOpacity') != PixelFormat.OPAQUE ? Bitmap.Config.ARGB_8888 :
              Bitmap.Config.RGB_565;
            const bitmap = Bitmap.createBitmap(w, h, config);
            const canvas = new Canvas(bitmap);
            InvokeAndroidMethod(drawable1, 'setBounds', 0, 0, w, h);
            InvokeAndroidMethod(drawable1, 'draw', canvas);
            return bitmap;
          }
          const File = ImportAndroidPackage("java.io.File");
          const FileOutputStream = ImportAndroidPackage("java.io.FileOutputStream");
          const ByteArrayOutputStream = ImportAndroidPackage("java.io.ByteArrayOutputStream");
          const Bitmap = ImportAndroidPackage("android.graphics.Bitmap");
          const Canvas = ImportAndroidPackage("android.graphics.Canvas");
          const PixelFormat = ImportAndroidPackage("android.graphics.PixelFormat");
          const Drawable = ImportAndroidPackage("android.graphics.drawable.Drawable");
          const BitmapDrawable = ImportAndroidPackage("android.graphics.drawable.BitmapDrawable");

          const bitmap = drawableToBitamp(drawable);

          const bos = new ByteArrayOutputStream();
          bitmap.compress(Bitmap.CompressFormat.PNG, 100 /*ignored for PNG*/ , bos);
          //write the bytes in file
          // const file = new File(main.getApplicationContext().getExternalCacheDir(), packageName + ".png");
          let file = new File(main.getApplicationContext().getFilesDir(), packageName + ".png");
          const fos = new FileOutputStream(file);
          bos.writeTo(fos);
          fos.close();
          // console.log(InvokeAndroidMethod(file, 'getCanonicalPath'));
          return file.getCanonicalPath();
        } catch (e) {
          return '';
        }
      }
      const ApplicationInfo = ImportAndroidPackage("android.content.pm.ApplicationInfo");
      const main = plus.android.runtimeMainActivity();
      const pManager = InvokeAndroidMethod(main, 'getPackageManager');
      const pInfo = InvokeAndroidMethod(pManager, 'getInstalledPackages', 0);
      const total = InvokeAndroidMethod(pInfo, 'size');
      const appArr = [];
      // 遍历获取包名和应用名称
      for (let i = 0; i < total; i++) {
        // 获取包名
        const packName = plus.android.getAttribute(InvokeAndroidMethod(pInfo, 'get', i), 'packageName');
        const appInfo = InvokeAndroidMethod(pManager, 'getApplicationInfo', packName, 0);
        let appFlags = plus.android.getAttribute(appInfo, 'flags');
        if ((appFlags & ApplicationInfo.FLAG_SYSTEM) <= 0) {
          //第三方应用
          // 获取包名对应的应用名
          const appName = InvokeAndroidMethod(pManager, 'getApplicationLabel', appInfo);
          const appIcon = InvokeAndroidMethod(pManager, 'getApplicationIcon', appInfo);
          const appIconPath = drawableTofile(appIcon, packName);
          appArr.push({
            packName: packName,
            appName: appName,
            appIcon: appIconPath,
          });
        }
      }
      return appArr;
    } else {
      //unsupport, nothing to do.
    }
  } catch (e) {
    console.error('error @getMobileAppInfo!!', e);
  }
}

module.exports = {
  mac: getMac,
  availMem: getAvailMemory,
  totalMem: getTotalMemory,
  interStorage: getInternalStorage,
  cpuInfo: getCpuInfo,
  cpuCount: getCpuCount,
  onTorch: onTorch,
  offTorch: offTorch,
  SETTINGS_PARAM: SETTINGS_PARAM,
  openSetting: openSetting,
  openAppSetting: openAppSetting,
  openApp: openApp,
  broadCast: broadCast,
  getMobileAppInfo: getMobileAppInfo
}
