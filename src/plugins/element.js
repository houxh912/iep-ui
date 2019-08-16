import Vue from 'vue'
// 全局重置变量
import '@/styles/reset.css'
import '@/styles/element-variables.scss'

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import ElementUI from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(CollapseTransition)
Vue.use(ElementUI)
