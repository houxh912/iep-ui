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
      {
        path: 'announcement_detail',
        name: '通知公告详情',
        component: () => import('@/views/wel/message/Announcement/Detail.vue'),
      },
      {
        path: 'system_message_detail',
        name: '系统消息详情',
        component: () => import('@/views/wel/message/SystemMessage/Detail.vue'),
      },
    ],
  },
]
