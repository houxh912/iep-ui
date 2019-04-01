import Layout from '@/page/index/index'
export default [
  {
    path: '/app',
    component: Layout,
    redirect: '/app/index',
    children: [
      {
        path: 'index',
        name: '展示首页',
        component: () => import('@/views/app/index/'),
      },
    ],
  },
  {
    path: '/activti',
    component: Layout,
    redirect: '/activti/detail',
    children: [
      {
        path: 'detail/:id',
        component: () => import('@/views/activiti/detail'),
      },
    ],
  },
]
