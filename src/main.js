import Vue from 'vue'
import App from './App'
import t from 'lib'

Vue.use(t);

new Vue({
    el: '#app',
    t,
    render: h => h(App)
});