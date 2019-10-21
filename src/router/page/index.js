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
    component: () => import('@/page/LoginRegister/login'),
    meta: {
      keepAlive: false,
      isTab: false,
      isAuth: false,
    },
  },
  {
    path: '/register',
    name: '注册页',
    component: () => import('@/page/LoginRegister/register'),
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
]
