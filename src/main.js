import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 引入echarts
import * as echarts from 'echarts'
import './assets/index.css'
Vue.prototype.$echarts = echarts //挂载到原型上面 也可以选择不挂载 直接在页面上引入


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
