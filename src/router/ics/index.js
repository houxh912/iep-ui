import Layout from '@/page/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/ics_spa',
    component: Layout,
    redirect: '/ics_spa/help_center',
    children: [
      {
        path: 'help_center',
        name: '智能帮助中心',
        component: () => import(/* webpackChunkName: "ics" */'@/views/ics/helpCenter/index'),
        meta: noKeepAlive,
      },
    ],
  },
]
