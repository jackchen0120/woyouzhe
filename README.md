# 前言
本项目是利用业余时间开发完成的简单版，加深一下对各技术知识点的实操积累经验。基于 vue-cli3.x + axios 构建多页面应用的H5移动端电商网站，采用前后端分离技术，项目中用到的API接口是通过引入mockjs模拟数据和第三方API接口，让前端开发人员独立于后端进行开发。由于涉及微信页面，建议使用[微信web开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)进行页面开发。

前端人员也可以开发API接口，推荐几个模拟数据的工具，注册账号，查看官网文档：
* mockjs官网 [http://mockjs.com/](http://mockjs.com/)
* yapi官网 [http://yapi.demo.qunar.com/](http://yapi.demo.qunar.com/)
* easy-mock官网 [https://easy-mock.com/docs](https://easy-mock.com/docs)


# 项目架构
```
│  vue.config.js                     // webpack配置
│  vue.util.js                       // 打包多页面配置
│  
├─public
│      favicon.ico                   // 图标
│      index.html                    // 入口html文件
│      share.png                     // 微信分享提示
│      
├─src
│  ├─assets
│  │  ├─css
│  │  │      common.css              // 公共样式文件 
│  │  │      
│  │  ├─img                          // 存放公共图片文件夹
│  │  │          
│  │  └─js
│  │          api.js                 // 封装所有API接口调用方法
│  │          common.js              // 常用JS方法
│  │          export.js              // 外部调用入口
│  │          fastclick.js           // 移动端点击延迟事件处理
│  │          network.js             // axios封装与拦截器配置
│  │          url.js                 // 打包环境配置
│  │          
│  ├─components
│  │      backTop.vue                 // 返回顶部组件
│  │      categoryList.vue            // 商品分类组件
│  │      errNotice.vue               // 错误弹框提示信息组件
│  │      jumpCoupon.vue              // 跳转优惠券
│  │      loading.vue                 // 页面初始化加载数据的动画组件
│  │      qrcodePop.vue               // 生成二维码弹框
│  │      shopList.vue                // 商品列表组件
│  │      soldOut.vue                 // 请求数据错误展示占位图
│  │      
│  ├─mock
│  │      index.js                    引入mockjs模拟数据
│  │      
│  └─pages
│      ├─coupon
│      │      coupon.html             // 领券页面结构
│      │      coupon.js               // 领券页面入口文件，加载各种公用组件
│      │      coupon.vue              // 领券页
│      │      
│      ├─detail
│      │      detail.html             // 商品详情结构
│      │      detail.js               // 商品详情入口文件，加载各种公用组件
│      │      detail.vue              // 商品详情页
│      │      
│      ├─index
│      │      index.html              // 首页结构
│      │      index.js                // 首页入口文件，加载各种公用组件
│      │      index.vue               // 首页
│      │      
│      └─search
│              search.html            // 商品分类/关键词搜索页面结构
│              search.js              // 商品搜索入口文件，加载各种公用组件
│              search.vue             // 商品搜索页
│              
└─static                               // 存放静态资源文件夹
    │  
    │  
    └─img                              // 静态图片文件夹
```


# 技术栈
 * vue2.6
 * axios
 * webpack
 * ES6/7
 * flex布局
 * rem单位适配移动端
 * mockjs
 
# 功能模块
* 首页
* 轮播图
* 返回顶部
* 类目、模糊搜索
* 二维码公众号
* 详情页展示
* 猜你喜欢
* 查看、领取优惠券
* 复制优惠券链接
* 朋友圈分享提示

# 下载安装依赖
```
git clone https://github.com/jackchen0120/woyouzhe.git
cd woyouzhe
npm install 或 yarn
```

## 开发模式
```
npm run serve
```

## 生产环境打包
```
npm run build
```

# 部分截图

## 首页

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_1.jpg" width="375" alt="首页" />

## 分类搜索页

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_2.jpg" width="375" alt="分类搜索页" />

## 二维码公众号

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_3.jpg" width="375" alt="分类二维码公众号" />

## 详情页

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_4.jpg" width="375" alt="详情页" />

## 查看优惠券

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_5.png" width="375" alt="查看优惠券" />

## 复制优惠券链接

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_6.png" width="375" alt="复制优惠券链接" />

## 淘宝领券

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/wyz_7.jpg" width="375" alt="淘宝领券" />

## 微信分享提示

<img src="https://github.com/jackchen0120/woyouzhe/blob/master/static/img/share.png" width="375" alt="微信分享提示" />
