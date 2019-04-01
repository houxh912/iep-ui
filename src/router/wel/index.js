import Layout from '@/page/index/index'
export default [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '后台首页',
        component: () => import('@/views/wel/index/'),
      },
      {
        path: 'info',
        name: '个人信息',
        component: () => import('@/views/wel/info/'),
      },
      {
        path: 'org',
        name: '选择组织',
        component: () => import('@/views/wel/org/index'),
      },
    ],
  },
]