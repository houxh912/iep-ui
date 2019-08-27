import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/mlms_spa',
    component: Layout,
    redirect: '/mlms_spa/summary/:id',
    children: [
      {
        path: 'summary/detail/:id',
        name: '查看纪要',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/summary/detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'summary/create',
        name: '新增纪要',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/summary/mainDialog.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'summary/update/:id',
        name: '修改纪要',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/summary/mainDialog.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'material/create',
        name: '新建文档',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/datum/material/newlyDialog.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'material/detail/:id',
        name: '查看文档',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/datum/material/detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'aptitude/detail/:id',
        name: '查看荣誉资质',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/datum/aptitude/detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'contract/detail/:id',
        name: '查看合同',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/material/datum/contract/detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'email/detail/:id',
        name: '查看邮件',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/mlms/email/detail/index'),
        meta: noKeepAlive,
      },
      {
        path: 'thought/detail/:id',
        name: '查看说说',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/app/thoughtList/thoughtDetail/detail'),
        meta: noKeepAlive,
      },
      {
        path: 'subject/detail',
        name: '说说话题详情',
        component: () => import(/* webpackChunkName: "mlms" */'@/views/thought/admin/subject/detail'),
        meta: noKeepAlive,
      },
    ],
  },
]
