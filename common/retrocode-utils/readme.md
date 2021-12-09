# retrocode-utils

## 说明

retrocode-utils是我个人汇总的一个JavaScript工具类库,涵盖了日常使用到的各种工具函数.目前主要以自用为主,后续当文档完善后,会正式开源.

## 目录结构

```html
|-- retrocode-utils
    |-- changelog.md          更新日志
    |-- config.js             通用配置文件,在集成的第三方sdk时,key之类的密匙会统一在此处配置
    |-- index.js              导出文件
    |-- package.json          发布至dcloud时的插件包配置文件
    |-- readme.md             工具库说明文件
    |-- js_sdk                工具函数目录
        |-- function          通用函数目录,本目录下的函数是js通用的,意味着你可以在任何运行js的平台上使用这些函数
        |   |-- colorGradient.js
        |   |-- debounce.js
        |   |-- deepClone.js
        |   |-- deepMerge.js
        |   |-- guid.js
        |   |-- index.js       当前目录所有函数的导出文件,你可以根据喜好选择性引入
        |   |-- md5.js
        |   |-- queryParams.js
        |   |-- random.js
        |   |-- randomArray.js
        |   |-- test.js
        |   |-- throttle.js
        |   |-- trim.js
        |-- native            uniapp中native.js的封装,由于个人技术力原因,目前只支持了安卓端常用原生函数
        |   |-- index.js
        |   |-- uniplus.js
        |-- open              集成的第三方js_sdk目录,这里汇总了常用的第三方jssdk,如腾讯位置服务等
        |   |-- index.js
        |   |-- qqmap
        |       |-- index.js
        |       |-- qqmap-wx-jssdk.min.js
        |-- uni               uniapp平台特有的api封装
            |-- confirm.js
            |-- db.js
            |-- getLocation.js
            |-- index.js
            |-- makePhoneCall.js
            |-- route.js
            |-- sys.js
            |-- toast.js
```

## 快速上手

1. 在`main.js`中引入
```js
// main.js
// 全局挂载通用utils库
import retrocodeUtils from "@/common/retrocode-utils"
Vue.prototype.$rc = retrocodeUtils;
// 我对工具类库做了细分管理,你可以根据个人使用习惯进行挂载
Vue.prototype.$db = retrocodeUtils.db;
```

## 使用方法

```html
<script>
export default {
  created() {
    this.$rc.toast('HelloWorld!');
  }
};
</script>
```

```js
import $rc from '/common/retrocode-utils'
$rc.toast('HelloWorld!');
```

## 版权信息
retrocode-utils遵循[MIT](https://en.wikipedia.org/wiki/MIT_License)开源协议，意味着您无需支付任何费用，也无需授权，即可将本工具库应用到您的产品中。
