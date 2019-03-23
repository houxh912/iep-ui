import Vue from 'vue'

import '@/core/components_use'

import '@/styles/common.scss'

// // 引入avue的包
import Avue from '@smallwei/avue/lib/index.js'
// // 引入avue的样式文件
import '@smallwei/avue/lib/theme-chalk/index.css'
import Viser from 'viser-vue'

import { loadStyle } from '@/util/util'
import { iconfontUrl, iconfontVersion } from '@/config/env'
import * as filters from '@/filters/' // 全局filter

Vue.use(Avue, { menuType: 'text' })
Vue.use(Viser)
//加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})