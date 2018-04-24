import axios from 'axios'
//引用自定义组件
import 'lib/components/weui.css'
import message from 'lib/components/alert'
import loader from 'lib/components/loading'

//生成签名的随机串
let randomString = function () {
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
let weChatAuthRedirect = function (appId, authURL, redirectURL) {
    //console.log('weChatAuthRedirect appId=='+appId+' authURL=='+authURL+' redirectURL=='+redirectURL);

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
let initRem = function () {
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
let initIOSBackBtn = function () {

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
    baseURL: null,
    publicPath: null,
    wxSignatureApi: null,
    wxAuthorizedApi: null,
    wxDebug: false,
    wxJsApiList: null,
    errorCodeValue: '00',
    commonErrorTips: '抱歉，服务器繁忙。<br/>请稍后再试。'
};

/** Class representing a point.
 * 
*/
class T {

    /**
     * 
     * 
     *
     */
    constructor(tConfig) {
        this.isNeedRedirect = false;//是否需要进行微信重定向
        this.VERSION = '1.0.3';
        this.init(tConfig);
    }

    /**
     * Get the version value.
     * @return {string} 版本号
     *
     */
    get version() {
        return this.VERSION;
    }

    /**
     * Init the t.
     * 
     */
    init(tConfig) {

        inT = Object.assign({}, inT, tConfig);

        initRem();

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
     * @param {object}
     * @returns {object}
     */
    ajax(opt) {
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
        if (opt.isShowLoader === undefined || opt.isShowLoader) {
            this.showLoader();
        }

        if (opt.responseType && (typeof opt.responseType === 'string') && opt.responseType.trim() !== '') {
            tempResponseType = opt.responseType;
        }

        //对axios回应进行拦截
        instance.interceptors.response.use(function (response) {

            if (opt.isShowLoader === undefined || opt.isShowLoader) {
                that.hideLoader();
            }

            const data = response.data;

            if (data.errorCode !== inT.errorCodeValue) {
                that.showMessage({
                    content: data.errorMessage + ' (' + data.errorCode + ')'
                });
            }

            return response.data;
        }, function (error) {
            that.showMessage({
                content: inT.commonErrorTips
            });
            console.log('请求接口失败');
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
     */
    getJsSdkSignature() {

        let that = this;

        //是否需要启用JS接口
        if (!inT.isUseWxSdk) {
            return;
        }

        // 是否已经在HTML引入了JSSDK
        if (!window.wx) {
            that.showMessage({
                content: '请引入jsSDK'
            });
            return;
        }

        let nonceStr = randomString(),
            timestamp = (new Date().getTime()).toString();

        let configWx = function (signature) {

            wx.config({
                debug: inT.wxDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: inT.appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: inT.wxJsApiList // 必填，需要使用的JS接口列表
            });

            if (inT.wxDebug) {
                console.log('调用sdk成功！')
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
        //console.log('getQueryString name=='+name);

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
        //console.log('checkLocationHashKeyExist name=='+name);

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

        //console.log('isKeyExist=='+isKeyExist);
        return isKeyExist;
    }

    /**
     * 更新指定名称的location hash的值。如果指定名称不存在，则执行增加。
     * @param {string} name
     * @param {string} value
     */
    updateLocationHashKey(name, value) {
        //console.log('updateLocationHashKey name=='+name+' value=='+value);

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
        //console.log('isLocationHashEmpty');

        let tempStr = window.location.hash;
        //console.log('isLocationHashEmpty tempStr=='+tempStr);
        return tempStr === ''
    }

    /**
     * 获取除特定的名称以外的剩余location hash值。
     * @param {string} name
     * @returns {string}
     */
    getLocationHashWithoutKey(name) {
        //console.log('getLocationHashWithoutKey name=='+name);

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
        //console.log('addLocationHashKey name=='+name+' value=='+value);

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
        //console.log('localStorage name=='+name+' value=='+value);

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
     * @param {object} opt
     */
    showMessage(opt) {
        this.hideLoader();
        message(opt);
    }

    /**
     * 显示Loader, 可以通过hideLoader()方法显式关闭或者等待超时才关闭。
     * @param {object}
     */
    showLoader(tempOpt) {
        // console.log('showLoader');
        let opt = {
            visible: true
        };

        opt = Object.assign({}, opt, tempOpt);
        loader.showLoading(opt);
    }

    /**
     * 隐藏Loader。
     */
    hideLoader() {
        // console.log('hideLoader');
        loader.hideLoading();
    }

    /**
     * 通过微信服务器获取用户openId
     */
    getOpenIdFromWx() {

        //在开发阶段，写死了openId，将不会进行重定向
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
        // console.log('cookie name=='+name+' value=='+value+' options=='+options);

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