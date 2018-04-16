import axios from 'axios'
import 'lib/components/weui.css'
//引用自定义组件
import $message from 'lib/components/alert'
import loadingObj from 'lib/components/loading'
//引入配置文件
import tConfig from 'tConfig/tConfig'

let inT = {
    baseURL: '',
    errorCodeValue: '00',
    commonErrorTips: '抱歉，服务器繁忙。<br/>请稍后再试。',
};

class T {
    constructor() {
        this.init();
    }
}

//在ES6中，对象方法的定义更加简洁，不需要使用function关键字。这时，可以使用Object.assign()为对象新增方法：
Object.assign(T.prototype, {
    init() {
        inT = Object.assign({}, inT, tConfig);
    },

    ajax(opt) {
        let that = this;
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
        } // End if

        if ((tempMethod === 'PUT' || tempMethod === 'DELETE' || tempMethod === 'POST' || tempMethod === 'PATCH') && tempIsStringifyPostData) {
            tempParams = JSON.stringify(tempParams);
        } // End if

        //显示loader
        if (opt.isShowLoader === undefined || opt.isShowLoader) {
            this.showLoader();
        }

        if (opt.responseType && (typeof opt.responseType === 'string') && $.trim(opt.responseType) !== '') {
            tempResponseType = opt.responseType;
        }

        //对axios回应进行拦截
        axios.interceptors.response.use(function (response) {

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

        return axios({
            method: tempMethod,
            url: tempUrl,
            params: tempParams,
            timeout: tempTimeout,
            headers: tempHeaders,
            responseType: tempResponseType
        });
    },

    getBaseURL() {
        return inT.baseURL;
    },

    showMessage(opt) {
        $message(opt);
        this.hideLoader();
    },
    showLoader() {
        // console.log('showLoader');
        loadingObj.showLoading({
            visible: true
        });
    },

    hideLoader() {
        // console.log('hideLoader');
        loadingObj.hideLoading();
    },
});


export default {
    install(Vue, options) {
        Vue.prototype.$t = new T();
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(t);
}