<a name="T"></a>

## T
Class representing a point.

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
<a name="T+ajax"></a>

### t.ajax(opt) ⇒ <code>object</code>
发起ajax请求

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| opt | <code>object</code> | 

<a name="T+getJsSdkSignature"></a>

### t.getJsSdkSignature()
微信 JS 接口签名

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

<a name="T+showMessage"></a>

### t.showMessage(opt)
显示消息给用户。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| opt | <code>object</code> | 

<a name="T+showLoader"></a>

### t.showLoader(tempOpt)
显示Loader, 可以通过hideLoader()方法显式关闭或者等待超时才关闭。

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| tempOpt | <code>object</code> | 

<a name="T+hideLoader"></a>

### t.hideLoader()
隐藏Loader。

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+getOpenIdFromWx"></a>

### t.getOpenIdFromWx()
通过微信服务器获取用户openId

**Kind**: instance method of [<code>T</code>](#T)  
<a name="T+cookie"></a>

### t.cookie(name, value, options) ⇒ <code>string</code>
cookie 的读和写操作

**Kind**: instance method of [<code>T</code>](#T)  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 
| value | <code>string</code> | 
| options | <code>object</code> | 

