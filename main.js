import Vue from 'vue'
import App from './App'
// 全局混入通用api库
import * as Api from './common/api.js'
Vue.prototype.$api = Api;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()