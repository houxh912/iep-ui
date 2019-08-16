import Vue from 'vue'
// 全局重置变量
import '@/styles/reset.css'
// TODO:等 element-ui 2.11.0 修复
import '@/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import ElementUI from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(CollapseTransition)
Vue.use(ElementUI)
