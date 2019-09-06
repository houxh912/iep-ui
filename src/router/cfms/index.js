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
          isAuth: true,
        },
      },
    ],
  },
]
