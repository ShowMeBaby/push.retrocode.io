# push.retrocode.io

使用uniapp的unipush实现的个人推送服务程序

## 简介

因为unipush使用的是个推VIP版,我们不用再担心推送效率问题了.而且免费使用,省心省力.


## 演示图片

![演示图片](https://gitee.com/retrocode/picture_bed/raw/master/image/20210314233902.png)

## 部署教程

// TODO

## 流程图：

![UniPush流程图](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/8ceb3f60-3b97-11eb-bd01-97bc1429a9ff.png)

>注意这是原生支持端功能，必须使用正确的包名、证书、签名才能使用**

## 目录结构：

```bash
├── cloudfunctions         #云函数目录
|   │─── common            #公共模块
|   |   │── config         #配置文件
|   |   └── uni-push       #push核心代码模块
│   └── pushDemo           #推送功能demo
└── 根目录
```

## 使用流程：
1. 开通并配置UniPush[详情](https://ask.dcloud.net.cn/article/35716)
2. 将获取到的相关key填写到配置文件
3. 通过自定义基座获取到某一台设备的[clientid](http://www.html5plus.org/doc/zh_cn/push.html#plus.push.getClientInfo)
4. 修改pushDemo文件的clientid右键上传并运行即可体验

>注意：1.请打包app【建议用自定义基座】2.务必使用真机调试

> 更多关于UniPush的文献参考：[UniPush使用指南](https://ask.dcloud.net.cn/article/35622)