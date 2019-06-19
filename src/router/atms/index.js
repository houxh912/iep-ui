import Layout from '@/page/index/index'
export default [
  {
    path: '/atms',
    component: Layout,
    redirect: '/atms/add',
    children: [
      {
        path: 'add',
        name: '添加任务',
        component: () => import('@/views/atms/add'),
      },
      {
        path: 'details',
        name: '任务详情',
        component: () => import('@/views/atms/details'),
      },
    ],
  },
]