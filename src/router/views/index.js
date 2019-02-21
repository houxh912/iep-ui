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
        component: () => import(/* webpackChunkName: "views" */ '@/views/app/index/'),
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
        component: () => import(/* webpackChunkName: "views" */ '@/views/wel/index/'),
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
        component: () => import(/* webpackChunkName: "views" */ '@/page/org/select'),
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
        component: () =>
          import(/* webpackChunkName: "page" */ '@/views/admin/user/info'),
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
        component: () =>
          import(/* webpackChunkName: "views" */ '@/views/activiti/detail'),
      },
    ],
  },
]
