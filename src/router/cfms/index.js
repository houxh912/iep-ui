import Layout from '@/page/index/'
export default [
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
