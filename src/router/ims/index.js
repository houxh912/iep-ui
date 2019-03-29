import Layout from '@/page/index/index'
export default [
  {
    path: '/ims_spa',
    component: Layout,
    redirect: '/ims_spa/announcement',
    children: [
      {
        path: 'announcement',
        name: '通知公告',
        component: () => import('@/views/wel/message/Announcement/Form.vue'),
      },
    ],
  },
]
