import Vue from 'vue'
import App from './App'
import t from 'lib'
import tConfig from '../tConfig.json'
import WeVue from 'we-vue'
import 'we-vue/lib/style.css'


//改了一些东西

Vue.use(WeVue);
Vue.use(t, tConfig);

new Vue({
    el: '#app',
    render: h => h(App)
});