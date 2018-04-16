/*
* @Author: Marte
* @Date:   2018-04-10 08:58:52
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-12 15:11:44
*/

import alertTpl from './alert.vue';
import Vue from 'vue';

const message = (function () {
    let options = {
        content : '确定要删除数据?',
        confirm: null,
        btnText : '确定',
    };
    const alertCom = Vue.extend(alertTpl);
    return function (opts) {
        opts = Object.assign({},options,opts);
        const vm = new alertCom({
            el: document.createElement('div'),
            data: {
                btnText: opts.btnText,
                content: opts.content
            },
            methods: {
                confirmBtn() {
                    document.body.removeChild(vm.$el);
                    opts.confirm && opts.confirm();
                }
            }
        });

        document.body.appendChild(vm.$el);
    }
})();

export default message;