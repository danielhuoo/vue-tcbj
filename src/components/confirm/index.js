/*
* @Author: Marte
* @Date:   2018-04-10 10:01:07
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-12 15:19:30
*/
import confirmTpl from './confirm.vue';
import Vue from 'vue';

const $confirm = (function () {

    let options = {
        title: '提示',
        content: '是否要删除数据？',
        cancelBtnText: '取消',
        confirmBtnText: '确定',
        cancel: null,
        confirm: null
    };
    const confirmCom = Vue.extend(confirmTpl);

    return function (opts) {
         opts = Object.assign({}, options, opts);
         const vm = new confirmCom({
            el: document.createElement('div'),
            data: {
                title: opts.title,
                content: opts.content,
                cancelBtnText: opts.cancelBtnText,
                confirmBtnText: opts.confirmBtnText
            },
            methods: {
                confirmBtn() {
                    document.body.removeChild(vm.$el);
                    opts.confirm && opts.confirm();
                },
                cancelBtn() {
                    document.body.removeChild(vm.$el);
                    opts.cancel && opts.cancel();
                }
            }
         });
         document.body.appendChild(vm.$el);
    }
})();


export default  $confirm;