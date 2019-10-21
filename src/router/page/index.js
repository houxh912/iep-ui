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
    path: '/meeting/:id',
    name: '报名页',
    component: () => import('@/page/MeetingDetail/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/newlogin',
    name: '新登录页',
    component: () => import('@/page/LoginRegister/login'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/meeting',
    name: '报名页预览',
    component: () => import('@/page/MeetingDetail/index'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/newregister',
    name: '新注册页',
    component: () => import('@/page/LoginRegister/register.vue'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/authredirect',
    name: '授权',
    component: () => import('@/page/authredirect/index'),
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
