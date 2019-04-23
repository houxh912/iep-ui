import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
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
        meta: noKeepAlive,
      },
      {
        path: 'approval/:id',
        name: '新增审批',
        component: () => import('@/views/wel/approval/Components/New/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'approval_detail/:id',
        name: '审批详情',
        component: () => import('@/views/hrms/AdministrativeApproval/Detail.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruitment_publish/:id',
        name: '发布招聘表单',
        component: () => import('@/views/hrms/Recruitment/Publish/Page/Edit.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
