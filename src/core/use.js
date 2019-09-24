import Vue from 'vue'
import Directives from '../directives/index'

import '@/core/components_use'
import '@/core/custom_use'
import '@/core/editor_use'
import '@/core/charts_use'
import '@/core/gov_use'

import '@/styles/common.scss'

// // 引入avue的包
import Avue from '@smallwei/avue/lib/index.js'

import { mergeByFirst, openPage, openTagDetail, fillStatisticsArray } from '@/util/util'
import { wsUrl } from '@/config/env'
import * as filters from '@/filters/' // 全局filter

Vue.prototype.$mergeByFirst = mergeByFirst
Vue.prototype.$openPage = openPage
Vue.prototype.$openTagDetail = openTagDetail
Vue.prototype.$fillStatisticsArray = fillStatisticsArray
Vue.prototype.$wsUrl = wsUrl
Vue.prototype.$wxAppId = 'wx92d9fe94daef034e'

Vue.use(Directives)
Vue.use(Avue, { menuType: 'text' })

//加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
