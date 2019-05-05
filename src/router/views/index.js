import Layout from '@/page/index/index'
export default [
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
    path: '/error',
    name: '错误页',
    component: Layout,
    redirect: '/error/404',
    children: [
      {
        path: '404',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/404'),
        name: '404',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '403',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/403'),
        name: '403',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '500',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/500'),
        name: '500',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '502',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/502'),
        name: '502',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '503',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/503'),
        name: '503',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
      {
        path: '504',
        component: () =>
          import(/* webpackChunkName: "page" */ '@/components/error-page/504'),
        name: '504',
        meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false,
        },
      },
    ],
  },
]
