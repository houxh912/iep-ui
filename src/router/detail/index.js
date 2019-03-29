import Layout from '@/page/index/index'
export default [
  {
    path: '/detail',
    component: Layout,
    redirect: '/detail/growth_file/:id',
    children: [
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import('@/views/detail/hrms/GrowthFile/index.vue'),
      },
      {
        path: 'announcement',
        name: '通知公告',
        component: () => import('@/views/wel/message/Announcement/Form.vue'),
      },
    ],
  },
]
