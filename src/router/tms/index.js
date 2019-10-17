import Layout from '@/page/index/index'
export default [
  {
    path: '/tms',
    component: Layout,
    redirect: '/tms/management/edit/:id',
    children: [
      {
        path: 'management/edit/:id',
        name: '标签编辑',
        component: () => import('@/views/tms/Management/ClusteringResult/Edit.vue'),
      },
    ],
  },
]
