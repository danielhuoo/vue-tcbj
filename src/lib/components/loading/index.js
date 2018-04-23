import Vue from 'vue'
import loadingTpl from './loading.vue'

const hideLoading = function () {
    //如果已经存在就先删除这个节点
    if (document.querySelectorAll('.loadingBg').length) {
        let loading = document.querySelectorAll('.loadingBg')[0];
        loading.parentNode.removeChild(loading);
    }
};

const showLoading = function (opts) {
    let defaults = {
        visible: false,
        loadingText: '加载中...',
        time: null
    };

    hideLoading();

    const loadingCom = Vue.extend(loadingTpl);

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
                    hideLoading();
                }, opts.time);
            }
        }
    });

    document.body.appendChild(vm.$el);

};

export default {
    showLoading,
    hideLoading
};