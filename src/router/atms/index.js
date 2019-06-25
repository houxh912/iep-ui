import Layout from '@/page/index'
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
        path: 'edit/:id',
        name: '编辑任务',
        component: () => import('@/views/atms/add'),
      },
      {
        path: 'details/:id',
        name: '任务详情',
        component: () => import('@/views/atms/details'),
      },
    ],
  },
]