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
        path: 'material/create',
        name: '新建文档',
        component: () => import('@/views/mlms/material/datum/material/newlyDialog.vue'),
      },
    ],
  },
]
