## v1.0.14 (2018-05-14)

### 优化

- 增加 t.getPublicPath()
- t.getOpenIdFromWx()增加一个参数 params



## v1.0.12 (2018-05-11)

### 优化

- t.ajax()增加post方式，传入的数据统一都是params
- t.ajax()增加errorCode拦截开关。在tConfig里配置 isCheckErrorCode即可


## v1.0.8 (2018-05-07)

### 优化

- 可以在tConfig里禁用微信分享了，记得在 wxJsApiList 里面添加上正确的接口名：hideOptionMenu
- 默认加上 closeWindow 接口，开发者不需要在 wxJsApiList 显式添加
- 扫码等接口可直接在业务逻辑里编写。必须包含在wx.ready()里面。

### 重构

- config文件由原来的json格式转为js。这样更加灵活。


## v1.0.7 (2018-05-04)

### 重构

- 用we-vue的UI替换了旧的loader和message模块

### 新增

- showAlert、showConfirm方法