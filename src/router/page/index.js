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
    component: () => import('@/page/newlogin/login'),
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
]
