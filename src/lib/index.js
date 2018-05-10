import axios from 'axios'
import 'we-vue/lib/style.css'
import { Dialog } from "we-vue"
import { Toast } from 'we-vue'

//生成签名的随机串
const randomString = function () {
    let len = 6,
        $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
        /****默认去掉了容易混淆的字符oO,Ll,9gq,Vv,Uu,I1****/
        maxPos = $chars.length,
        pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

//微信重定向
const weChatAuthRedirect = function (appId, authURL, redirectURL) {
    console.log('weChatAuthRedirect appId==' + appId + ' authURL==' + authURL + ' redirectURL==' + redirectURL);

    // 微信认证后的重定向接口
    let tempRedirectURL = encodeURIComponent(authURL),
        //  当前微信号主页面的URL, 后台会把openId以及我们提交的参数和当前微信号的URL, 重新拼装然后跳转到主页。
        //let tempIndexURL = encodeURIComponent(redirectURL);
        //alert('tempIndexURL=='+decodeURIComponent(tempIndexURL));

        // 第一个参数是重定向的URL, 以后的参数以 keyName,keyValue依次排列.
        tempState = encodeURIComponent(redirectURL),
        tempAuthorizeURL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + tempRedirectURL + '&response_type=code&scope=snsapi_base&state=' + tempState + '#wechat_redirect';
    //alert('微信重定向认证 tempAuthorizeURL:'+decodeURIComponent(tempAuthorizeURL));

    window.location.replace(tempAuthorizeURL);
};

//初始化Rem
const initRem = function () {
    /* 设计图文档宽度 */
    let docWidth = 750;

    let doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    let recalc = function refreshRem() {
        let clientWidth = docEl.getBoundingClientRect().width;

        /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
        docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

        return refreshRem;
    };

    if (!doc.addEventListener) {
        return
    };
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
};

//iOS系统在获取openId后，由于经过重定向，返回按钮会失效。为了点击返回按钮能关闭页面，需要用以下代码，该代码对安卓无影响。因此不需要对手机类型进行区分。
const initIOSBackBtn = function () {

    let state = {
        title: "title",
        url: "#"
    };
    window.history.pushState(state, "title", "#");

    window.addEventListener("popstate", () => {
        if (window.wx) {
            window.wx.closeWindow();
        } else {
            window.close();
        }
    }, false);
};

let inT = {
    appId: null,
    openId: null,
    isUseWxSdk: false,
    isDebugMode: false,
    baseURL: null,
    publicPath: null,
    wxSignatureApi: null,
    wxAuthorizedApi: null,
    wxDebug: false,
    wxJsApiList: null,
    errorCodeValue: '00',
    commonErrorTips: '抱歉，服务器繁忙。<br/>请稍后再试。'
};

class T {

    /**
     * 
     * 
     *
     */
    constructor(tConfig) {
        this.isNeedRedirect = false;//是否需要进行微信重定向
        this.init(tConfig);
    }

    log(message) {
        if (inT.isDebugMode) {
            console.log('[vue-tcbj]' + message);
        };
    }


    /**
     * Get the version value.
     * @return {string} 版本号
     *
     */
    get version() {
        return '1.0.11';
    }

    /**
     * Init the t.
     * 
     */
    init(tConfig) {


        inT = Object.assign({}, inT, tConfig);

        this.log('版本号为' + this.version);    

        // initRem();
        this.getJsSdkSignature();

            
    }

    /**
     * Get the appId value.
     * @return {string} appId
     */
    getAppId() {
        return inT.appId;
    }

    /**
     * Get the openId value.
     * @return {string} openId
     */
    getOpenId() {
        return inT.openId;
    }

    /**
     * 获取服务器接口域名地址
     * @return {string} baseURL
     */
    getBaseURL() {
        return inT.baseURL;
    }

    /**
     * 发起ajax请求
     * 
     * 当后台返回的errorCode与tConfig里指定的errorCodeValue 不相符时，表示请求出错，会被拦截，并弹出错误信息
     * 
     * @param {Object} option - 该方法需要一个对象作为参数
     * @param {string} opt.method - 请求的类型，默认为 GET
     * @param {string} opt.url - 请求的接口地址。此处不进行任何更改，传进什么就是什么。但会在末尾加上一个随机时间戳
     * @param {Object} opt.params - 请求的数据。默认为空对象
     * @param {number} opt.timeout - 请求的超时时间。单位为毫秒。默认为30000毫秒。
     * @param {Object} opt.headers - 请求的头信息。默认为空对象。
     * @param {string} opt.responseType - 请求的返回类型。默认为text。
     * @returns {object} axios instance - 返回一个Promise类型的axios实例，可对它做进一步处理。
     * 关于axios的详细资料见：https://github.com/axios/axios
     */
    ajax(opt) {
        this.log('ajax');
        const instance = axios.create();

        const that = this;
        let tempMethod = opt.method || 'GET',
            tempUrl = '',
            tempParams = opt.params || {},
            tempTimeout = 30000,
            tempIsStringifyPostData = false,
            tempHeaders = {},
            tempResponseType = 'text';

        tempMethod = tempMethod.toUpperCase();

        if (opt.timeout !== undefined) {
            tempTimeout = opt.timeout;
        }

        if (typeof opt.headers === 'object') {
            tempHeaders = opt.headers;
        }

        if (opt.isDecodeURIComponent === false) {
            tempUrl = opt.url;
        } else {
            tempUrl = decodeURIComponent(opt.url);
        }


        if (tempMethod === 'GET') {
            if (tempUrl.indexOf('?') === -1) {
                tempUrl += '?';
            }

            tempUrl += '&_random=' + new Date().getTime();
        }

        if ((tempMethod === 'PUT' || tempMethod === 'DELETE' || tempMethod === 'POST' || tempMethod === 'PATCH') && tempIsStringifyPostData) {
            tempParams = JSON.stringify(tempParams);
        }

        //显示loader
        that.showLoader({
            duration: '10000000'
        });

        if (opt.responseType && (typeof opt.responseType === 'string') && opt.responseType.trim() !== '') {
            tempResponseType = opt.responseType;
        }

        //对axios回应进行拦截
        instance.interceptors.response.use((response) => {

            that.hideLoader();

            const data = response.data;

            if (data.errorCode !== inT.errorCodeValue) {
                that.showAlert({
                    message: data.errorMessage + ' (' + data.errorCode + ')'
                });
            }

            return response.data;
        }, (error) => {
            that.showAlert({
                message: inT.commonErrorTips
            });
            this.log('请求接口失败');
            return Promise.reject(error);
        });

        return instance({
            method: tempMethod,
            url: tempUrl,
            params: tempParams,
            timeout: tempTimeout,
            headers: tempHeaders,
            responseType: tempResponseType
        });
    }

    /**
     * 微信 JS 接口签名
     * 需要在tConfig指定是否调用微信JS接口。开发者无需显式调用该方法
     * 如需要调用，请先在HTML中引入官方JSSDK
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
     */
    getJsSdkSignature() {
        this.log('getJsSdkSignature');

        let that = this;

        if (!inT.isUseWxSdk) {
            return;
        }

        // 是否已经在HTML引入了JSSDK
        if (!window.wx) {
            that.showAlert({
                message: '请引入jsSDK'
            });
            return;
        }

        let nonceStr = randomString(),
            timestamp = (new Date().getTime()).toString();

        //检测wxJsApiList数组里是否有指定的api
        const checkWxJSApiList = function (api) {
            return new Promise((resolve, reject) => {
                let hasApi = false;
                for (let i = 0; i < inT.wxJsApiList.length; i++) {
                    if (inT.wxJsApiList[i] === api) {
                        hasApi = true;
                        resolve();
                    }
                }

                if (hasApi === false) {
                    reject();
                }
            })
        };

        //默认加上closeWindow接口，因为需要对iOS进行适配
        checkWxJSApiList('closeWindow')
            .then(() => {
                that.log("tConfig里有closeWindow");
            })
            .catch(() => {
                that.log("tConfig里没有closeWindow");
                inT.wxJsApiList.push('closeWindow');
            });

        const configWx = function (signature) {

            wx.config({
                debug: inT.wxDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: inT.appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: inT.wxJsApiList // 必填，需要使用的JS接口列表
            });

            wx.ready(function () {
                checkWxJSApiList('hideOptionMenu')
                    .then(() => {
                        that.log("隐藏右上角菜单");
                        wx.hideOptionMenu();
                    });
            });

            if (inT.wxDebug) {
                that.log('调用sdk成功！')
            }
        };

        let opts = {
            url: inT.baseURL + inT.wxSignatureApi,
            method: 'GET',
            params: {
                noncestr: nonceStr,
                timestamp: timestamp,
                url: decodeURIComponent(location.href.split('#')[0])
            }
        };

        //调用签名接口
        that.ajax(opts).then(data => {
            if (data.returnObject) {
                configWx(data.returnObject.signature);
            }
        });
    }

    /**
     * 获取网址问号后面特定参数对应的值
     * @param {string}
     * @returns {string}
     */
    getQueryString(name) {
        this.log('getQueryString name==' + name);

        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = window.location.search.substr(1).match(reg);

        if (r !== null) {
            return (r[2]);
        }

        return null;
    }

    /**
     * 检查给定名称的location hash是否存在。
     * @param {string}
     * @returns {boolean}
     */
    checkLocationHashKeyExist(name) {
        this.log('checkLocationHashKeyExist name==' + name);

        let tempStr = decodeURIComponent(window.location.hash).substring(1),
            tempArray = tempStr.split('&'),
            tempArray2 = [],
            isKeyExist = false,
            i = 0,
            len = tempArray.length;

        for (; i < len; i++) {
            tempArray2 = tempArray[i].split('=');
            if (tempArray2[0] === name) {
                isKeyExist = true;
                break;
            }
        } // End for

        //this.log('isKeyExist=='+isKeyExist);
        return isKeyExist;
    }

    /**
     * 更新指定名称的location hash的值。如果指定名称不存在，则执行增加。
     * @param {string} name
     * @param {string} value
     */
    updateLocationHashKey(name, value) {
        this.log('updateLocationHashKey name==' + name + ' value==' + value);

        if (this.checkLocationHashKeyExist(name)) {
            if (this.getLocationHashWithoutKey(name) === '') {
                window.location.hash = name + '=' + value;
            } else {
                window.location.hash = this.getLocationHashWithoutKey(name) + '&' + name + '=' + value;
            } // End if-else
        } else {
            this.addLocationHashKey(name, value);
        }
    }

    /**
     * 检查location hash是否为空。
     * @returns {boolean}
     */
    isLocationHashEmpty() {
        this.log('isLocationHashEmpty');

        let tempStr = window.location.hash;
        //this.log('isLocationHashEmpty tempStr=='+tempStr);
        return tempStr === ''
    }

    /**
     * 获取除特定的名称以外的剩余location hash值。
     * @param {string} name
     * @returns {string}
     */
    getLocationHashWithoutKey(name) {
        this.log('getLocationHashWithoutKey name==' + name);

        let tempStr = decodeURIComponent(window.location.hash).substring(1),
            tempArray = tempStr.split('&'),
            tempArray2 = [],
            tempNewStr = '',
            i = 0,
            len = tempArray.length;

        for (; i < len; i++) {
            tempArray2 = tempArray[i].split('=');
            if (tempArray2[0] !== name) {
                tempNewStr += '&' + tempArray2[0] + '=' + tempArray2[1];
            }
        }

        return tempNewStr.substring(1);
    }

    /**
     * 增加名称和相应的值到location hash。如果名称已经存在，则执行更新操作。
     * @param {string} name
     * @param {string} value
     */
    addLocationHashKey(name, value) {
        this.log('addLocationHashKey name==' + name + ' value==' + value);

        let tempStr = decodeURIComponent(window.location.hash);

        if (this.checkLocationHashKeyExist(name)) {
            this.updateLocationHashKey(name, value);
        } else {
            if (this.isLocationHashEmpty()) {
                tempStr = name + '=' + value;
            } else {
                tempStr += '&' + name + '=' + value;
            }

            window.location.hash = tempStr;
        }
    }

    /**
     * 从location hash获取给定名称的值。
     * @param {string} name
     * @returns {string}
     */
    getLocationHashValue(name) {
        this.log('getLocationHashValue name===' + name);
        let tempStr = decodeURIComponent(window.location.hash).substring(1),
            tempArray = tempStr.split('&'),
            tempArray2 = [],
            returnValue = null,
            i = 0,
            len = tempArray.length;

        for (; i < len; i++) {
            tempArray2 = tempArray[i].split('=');
            if (tempArray2[0] === name) {
                returnValue = tempArray2[1];
                break;
            }
        }

        return returnValue;
    }

    /**
     * localStorage 的读和写操作。
     * @param {string} name
     * @param {string} value
     */
    localStorage(name, value) {
        this.log('localStorage name==' + name + ' value==' + value);

        if (name === undefined || name === null || name.trim() === '') {
            return null;
        }

        if (value === undefined || value === null) {
            return localStorage.getItem(name);
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(name, value);
    }

    /**
     * 显示消息给用户。
     * 详细参数见：https://wevue.org/doc/v2_0/dialog 中的alert方法
     * @param {object} opt
     */
    showAlert(opt) {
        this.log('showAlert');

        if (!opt.title) {
            opt.title = '';
        }
        Dialog.alert(opt);
    }

    /**
     * 显示消息给用户。
     * 详细参数见：https://wevue.org/doc/v2_0/dialog 中的confirm方法
     * @param {object} opt
     */
    showConfirm(opt) {
        this.log('showConfirm');
        return Dialog.confirm(opt)
    }

    /**
     * 显示Loader。可以通过hideLoader()显式关闭或者等待超时才关闭。
     * 详细参数见：https://wevue.org/doc/v2_0/toast 中的loading方法
     * @param {object}
     */
    showLoader(tempOpt) {
        this.log('showLoader');

        if (tempOpt === undefined || tempOpt === null || tempOpt === '') {
            tempOpt = {
                message: '加载中'
            }
        }

        Toast.loading(tempOpt);
    }

    /**
     * 隐藏Loader。
     */
    hideLoader() {
        this.log('hideLoader');
        Toast.close();
    }

    /**
     * 通过微信服务器获取用户openId
     * 
     * 如果在tConfig里指定了openId，将不会进行重定向
     * 
     * 开发者需要在tConfig里配置好 wxAuthorizedApi 和 appId
     */
    getOpenIdFromWx() {
        this.log('getOpenIdFromWx');

        if (inT.openId) {
            return;
        }

        inT.openId = this.getQueryString('openId');
        // alert('111 openId===' + this.openId);
        if (this.cookie('openId') && !inT.openId) {
            inT.openId = this.cookie('openId');
            // alert('222 openId===' + this.openId);
        }

        if (!inT.openId) {
            // alert('isNeedRedirect');
            this.isNeedRedirect = true;
            // alert('weChatAuthRedirect');
            weChatAuthRedirect(inT.appId, this.getBaseURL() + inT.wxAuthorizedApi, inT.publicPath);
            // alert('redirectEnd');
        }

        if (this.isNeedRedirect) {
            return;
        }

        initIOSBackBtn();
    }

    /**
     * cookie 的读和写操作
     * @param {string} name
     * @param {string} value
     * @param {object} options
     * @returns {string}
     */
    cookie(name, value, options) {
        this.log('cookie name==' + name + ' value==' + value + ' options==' + options);

        if (typeof value !== 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            let expires = '';
            if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
                let date;
                if (typeof options.expires === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = ';expires=' + date.toUTCString();
            }
            let path = options.path ? ';path=' + options.path : ';path=/';
            let domain = options.domain ? ';domain=' + options.domain : '';
            let secure = options.secure ? ';secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            let cookieValue = '';
            if (document.cookie && document.cookie !== '') {
                let cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

}

export default {
    install(Vue, tConfig) {
        Vue.prototype.t = new T(tConfig);
    }
};