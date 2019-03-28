import Layout from '@/page/index/index'
export default [
  {
    path: '/hrms_spa',
    component: Layout,
    redirect: '/hrms_spa/growth_file/:id',
    children: [
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import('@/views/hrms/GrowthFile/index.vue'),
      },
    ],
  },
]
