import Layout from '@/page/index/index'
export default [
  {
    path: '/cfms_spa',
    component: Layout,
    redirect: '/cfms_spa/meeting_detail/:id',
    children: [
      {
        path: 'meeting_detail/:id',
        name: '会议详情',
        component: () => import('@/views/cfms/MeetingDetail/index.vue'),
        meta: {
          keepAlive: false,
          isTab: false,
          isAuth: true,
        },
      },
      {
        path: 'meeting_detail',
        name: '会议预览',
        component: () => import('@/views/cfms/MeetingDetail/index.vue'),
      },
    ],
  },
]
