import Vue from 'vue'
import 'we-vue/lib/style.css'
import t from 'lib'
import tConfig from '../tConfig.js'
import { Button } from 'we-vue'
import App from './App'
import api from './api'

Vue.use(t, tConfig);
Vue.use(api, Vue.prototype.t)
Vue.use(Button);

new Vue({
    el: '#app',
    render: h => h(App)
});