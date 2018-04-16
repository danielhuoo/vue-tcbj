import Vue from 'vue'
import loadingTpl from './loading.vue'

const showLoading = (function () {
    let defaults = {
        visible: false,
        loadingText: '加载中...',
        time: null
    };
    //如果已经存在就先删除这个节点
    if (document.querySelectorAll('.loadingWrap').length) {
        let loading = document.querySelectorAll('.loadingWrap')[0];
        loading.parentNode.removeChild(loading);
    }
    const loadingCom = Vue.extend(loadingTpl);
    return function (opts) {
        opts = Object.assign({}, defaults, opts);
        const vm = new loadingCom({
            el: document.createElement('div'),
            data: {
                visible: opts.visible,
                loadingText: opts.loadingText
            },
            mounted() {
                if (opts.time) {
                    setTimeout(() => {
                        this.visible = false;
                        document.body.removeChild(vm.$el);
                    }, opts.time);
                }
            }
        });

        document.body.appendChild(vm.$el);
    }

})();

const hideLoading = function () {
    //如果已经存在就先删除这个节点
    if (document.querySelectorAll('.loadingWrap').length) {
        let loading = document.querySelectorAll('.loadingWrap')[0];
        loading.parentNode.removeChild(loading);
    }
};

export default {
    showLoading,
    hideLoading
};