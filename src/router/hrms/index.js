import Layout from '@/page/index/index'
export default [
  {
    path: '/hrms_spa',
    component: Layout,
    redirect: '/hrms_spa/growth_file/:id',
    children: [
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import('@/views/hrms/GrowthFile/index.vue'),
      },
      {
        path: 'approval/:id',
        name: '新增审批',
        component: () => import('@/views/wel/approval/Components/New/index.vue'),
      },
      {
        path: 'approval_detail/:id',
        name: '审批详情',
        component: () => import('@/views/hrms/AdministrativeApproval/Detail.vue'),
      },
      {
        path: 'recruitment_publish/:id',
        name: '发布招聘表单',
        component: () => import('@/views/hrms/Recruitment/Publish/Page/Edit.vue'),
      },
    ],
  },
]
