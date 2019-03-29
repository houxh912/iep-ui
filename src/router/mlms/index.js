import Layout from '@/page/index/index'
export default [
  {
    path: '/mlms_spa',
    component: Layout,
    redirect: '/mlms_spa/summary/:id',
    children: [
      {
        path: 'summary/:id',
        name: '查看纪要',
        component: () => import('@/views/mlms/material/summary/detail.vue'),
      },
    ],
  },
]
