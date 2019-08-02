import Layout from '@/page/index/'
/**
 * 基础路由
 * @type { *[] }
 */
export default [
  {
    path: '/',
    name: '主页',
    redirect: '/wel/index',
  },
  {
    path: '/login',
    name: '登录页',
    component: () => import('@/page/login/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/newlogin',
    name: '登录页',
    component: () => import('@/page/newlogin/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/register',
    name: '注册页',
    component: () => import('@/page/register/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import('@/page/lock/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [
      {
        path: ':routerPath',
        name: 'iframe',
        component: () => import('@/components/iframe/main'),
        props: true,
      },
    ],
  },
  {
    path: '*', redirect: '/login',
  },
]
