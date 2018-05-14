<a name="T"></a>

## T
**Kind**: global class

<a name="T+version"></a>

### t.version ⇒ <code>string</code>
Get the version value.

**Kind**: instance property of [<code>T</code>](#T)  
**Returns**: <code>string</code> - 版本号  
<a name="T+init"></a>

### t.init()
Init the t.

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+getAppId"></a>

### t.getAppId() ⇒ <code>string</code>
Get the appId value.

**Kind**: instance method of [<code>T</code>](#T)  
**Returns**: <code>string</code> - appId  
<a name="T+getOpenId"></a>

### t.getOpenId() ⇒ <code>string</code>
Get the openId value.

**Kind**: instance method of [<code>T</code>](#T)  
**Returns**: <code>string</code> - openId  
<a name="T+getBaseURL"></a>

### t.getBaseURL() ⇒ <code>string</code>
获取服务器接口域名地址

**Kind**: instance method of [<code>T</code>](#T)  
**Returns**: <code>string</code> - baseURL  
<a name="T+getPublicPath"></a>

### t.getPublicPath() ⇒ <code>string</code>
获取静态页面地址

**Kind**: instance method of [<code>T</code>](#T)  
**Returns**: <code>string</code> - publicPath  
<a name="T+ajax"></a>

### t.ajax(option) ⇒ <code>object</code>
发起ajax请求

当后台返回的errorCode与tConfig里指定的errorCodeValue 不相符时，表示请求出错，会被拦截，并弹出错误信息

**Kind**: instance method of [<code>T</code>](#T)  
**Returns**: <code>object</code> - axios instance - 返回一个Promise类型的axios实例，可对它做进一步处理。
关于axios的详细资料见：https://github.com/axios/axios  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> | 该方法需要一个对象作为参数 |
| opt.method | <code>string</code> | 请求的类型，默认为 get。 小写即可 |
| opt.url | <code>string</code> | 请求的接口地址。此处不进行任何更改，传进什么就是什么。但会在末尾加上一个随机时间戳 |
| opt.params | <code>Object</code> | 请求的数据。默认为空对象 |
| opt.timeout | <code>number</code> | 请求的超时时间。单位为毫秒。默认为30000毫秒。 |
| opt.headers | <code>Object</code> | 请求的头信息。默认为空对象。 |
| opt.responseType | <code>string</code> | 请求的返回类型。默认为text。 |

<a name="T+getJsSdkSignature"></a>

### t.getJsSdkSignature()
微信 JS 接口签名
需要在tConfig指定是否调用微信JS接口。开发者无需显式调用该方法
如需要调用，请先在HTML中引入官方JSSDK
https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+getQueryString"></a>

### t.getQueryString(name) ⇒ <code>string</code>
获取网址问号后面特定参数对应的值

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="T+checkLocationHashKeyExist"></a>

### t.checkLocationHashKeyExist(name) ⇒ <code>boolean</code>
检查给定名称的location hash是否存在。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="T+updateLocationHashKey"></a>

### t.updateLocationHashKey(name, value)
更新指定名称的location hash的值。如果指定名称不存在，则执行增加。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> | 

<a name="T+isLocationHashEmpty"></a>

### t.isLocationHashEmpty() ⇒ <code>boolean</code>
检查location hash是否为空。

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+getLocationHashWithoutKey"></a>

### t.getLocationHashWithoutKey(name) ⇒ <code>string</code>
获取除特定的名称以外的剩余location hash值。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="T+addLocationHashKey"></a>

### t.addLocationHashKey(name, value)
增加名称和相应的值到location hash。如果名称已经存在，则执行更新操作。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> | 

<a name="T+getLocationHashValue"></a>

### t.getLocationHashValue(name) ⇒ <code>string</code>
从location hash获取给定名称的值。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="T+localStorage"></a>

### t.localStorage(name, value)
localStorage 的读和写操作。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> | 

<a name="T+showAlert"></a>

### t.showAlert(opt)
显示消息给用户。
详细参数见：https://wevue.org/doc/v2_0/dialog 中的alert方法

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| opt | <code>object</code> | 

<a name="T+showConfirm"></a>

### t.showConfirm(opt)
显示消息给用户。
详细参数见：https://wevue.org/doc/v2_0/dialog 中的confirm方法

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| opt | <code>object</code> | 

<a name="T+showLoader"></a>

### t.showLoader(tempOpt)
显示Loader。可以通过hideLoader()显式关闭或者等待超时才关闭。
详细参数见：https://wevue.org/doc/v2_0/toast 中的loading方法

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| tempOpt | <code>object</code> | 

<a name="T+hideLoader"></a>

### t.hideLoader()
隐藏Loader。

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+getOpenIdFromWx"></a>

### t.getOpenIdFromWx(publicPath)
通过微信服务器获取用户openId

如果在tConfig里指定了openId，将不会进行重定向

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type | Description |
| --- | --- | --- |
| publicPath | <code>string</code> | 可临时覆盖tConfig.js里的 publicPath值，仅在当次调用有效。 可在后面加上所需要的参数，keyName,keyValue 依次排列. 开发者需要在tConfig里配置好 wxAuthorizedApi 和 appId |

<a name="T+cookie"></a>

### t.cookie(name, value, options) ⇒ <code>string</code>
cookie 的读和写操作

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> | 
| options | <code>object</code> | 

