import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import axios from './router/axios'
import VueAxios from 'vue-axios'
import './permission' // 权限
import './error' // 日志
import router from './router/router'
import App from './App'
import store from './store'
import { loadStyle } from './util/util'
import * as urls from '@/config/env'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import * as filters from './filters' // 全局filter
import './styles/common.scss'
// // 引入avue的包
import Avue from '@smallwei/avue/lib/index.js'
// // 引入avue的样式文件
import '@smallwei/avue/lib/theme-chalk/index.css'

import 'element-ui/lib/theme-chalk/index.css'

import VueClipboard from 'vue-clipboard2'

import basicContainer from './components/basic-container/main'

import IepButton from '@/components/IepCommon/Button'

import '@/config/index'
// 插件 json 展示
// import vueJsonTreeView from 'vue-json-tree-view'

import { validatenull } from '@/util/validate'

Vue.prototype.validatenull = validatenull

Vue.use(Avue, { menuType: 'text' })

Vue.use(ElementUI)

Vue.use(VueRouter)

Vue.use(VueClipboard)

Vue.use(VueAxios, axios)

// 注册全局容器
Vue.component('basicContainer', basicContainer)
Vue.component('IepButton', IepButton)

// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

//加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
