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
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '后台首页',
        component: () => import('@/views/wel/index/'),
      },
    ],
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org/select',
    children: [
      {
        path: 'select',
        name: '选择组织',
        component: () => import('@/page/org/select'),
      },
    ],
  },
  {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [
      {
        path: 'index',
        name: '个人信息',
        component: () => import('@/views/admin/user/info'),
      },
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import('@/views/hrms/GrowthFile/index.vue'),
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
  {
    path: '/components',
    component: Layout,
    redirect: '/components/index',
    children: [
      {
        path: 'index',
        component: () => import('@/components/demo/index'),
      },
    ],
  },
]
