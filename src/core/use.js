import Vue from 'vue'

import '@/core/components_use'
import '@/core/custom_use'
import '@/core/editor_use'
import '@/core/charts_use'

import '@/styles/common.scss'

import { loadStyle, loadJs, mergeByFirst, openPage,openTagDetail, fillStatisticsArray } from '@/util/util'
import { iconfontUrl, iconfontVersion, multicolorIconfontUrl, wsUrl } from '@/config/env'
import * as filters from '@/filters/' // 全局filter

Vue.prototype.$mergeByFirst = mergeByFirst
Vue.prototype.$openPage = openPage
Vue.prototype.$openTagDetail = openTagDetail
Vue.prototype.$fillStatisticsArray = fillStatisticsArray
Vue.prototype.$wsUrl = wsUrl

//加载过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

loadJs(multicolorIconfontUrl)
