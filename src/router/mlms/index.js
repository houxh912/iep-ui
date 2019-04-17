import Layout from '@/page/index/index'
export default [
  {
    path: '/mlms_spa',
    component: Layout,
    redirect: '/mlms_spa/summary/:id',
    children: [
      {
        path: 'summary/detail/:id',
        name: '查看纪要',
        component: () => import('@/views/mlms/material/summary/detail.vue'),
      },
      {
        path: 'summary/create',
        name: '新增纪要',
        component: () => import('@/views/mlms/material/summary/mainDialog.vue'),
      },
      {
        path: 'summary/update/:id',
        name: '修改纪要',
        component: () => import('@/views/mlms/material/summary/mainDialog.vue'),
      },
      {
        path: 'material/create',
        name: '新建文档',
        component: () => import('@/views/mlms/material/datum/material/newlyDialog.vue'),
      },
      {
        path: 'material/detail/:id',
        name: '查看文档',
        component: () => import('@/views/mlms/material/datum/material/detail.vue'),
      },
      {
        path: 'contract/detail/:id',
        name: '查看合同',
        component: () => import('@/views/mlms/material/datum/contract/detail.vue'),
      },
      {
        path: 'email/detail/:id',
        name: '查看邮件',
        component: () => import('@/views/mlms/email/tableTpl/mainDialog'),
      },
    ],
  },
]
