## v1.0.8 (2018-05-07)

### 优化

- 可以在tConfig里禁用微信分享了，记得在 wxJsApiList 里面添加上正确的接口名：hideOptionMenu
- 默认加上 closeWindow 接口，开发者不需要在 wxJsApiList 显式添加
- 扫码等接口可直接在业务逻辑里编写。必须包含在wx.ready()里面。


## v1.0.7 (2018-05-04)

### 重构

- 用we-vue的UI替换了旧的loader和message模块

### 新增

- showAlert、showConfirm方法