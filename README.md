# 个人推送应用

这是一个使用uniapp的unipush服务搭建的个人推送App

# App端

就两个页面,接了一个解析markdown的插件,直接看源码就好了不过多解释.

# 服务端

服务端使用原生php搭建,顺带熟悉下php框架的搭建流程

> 个人使用,故采用sqlite做数据库,偶尔会发送database is locked,若二开注意尽量控制同时请求数.

## App查询接口

| 接口(POST)             | 描述         |
| ---------------------- | ------------ |
| api.php/push/savecid   | 提交设备CID  |
| api.php/push/getlist   | 获取推送列表 |
| api.php/push/unreadnum | 获取未读条数 |
| api.php/push/allread   | 清除未读     |
| api.php/push/getinfo   | 获取推送详情 |

## 推送接口

> 默认直接访问index.php既是推送接口(GET接口)

| 参数    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| message | 推送内容,必填                                                |
| title   | 内容标题,选填,若不带参数,则默认message为title                |
| level   | 内容等级0-3,根据等级在APP端会有不同等级的提示颜色,选填,默认0 |

# License

This project is licensed under the [MIT license](LICENSE).    
Copyright (c) ShowMeBaby (retrocode@qq.com)
