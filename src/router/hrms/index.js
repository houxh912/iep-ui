import Layout from '@/page/index/index'
import { noKeepAlive } from '../config'
export default [
  {
    path: '/hrms_spa',
    component: Layout,
    redirect: '/hrms_spa/growth_file/:id',
    children: [
      {
        path: 'employee_profile_edit/:id',
        name: '员工信息编辑',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/EmployeeProfile/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'growth_file/:id',
        name: '成长档案',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/GrowthFile/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'approval/:id',
        name: '新增审批',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/wel/approval/Components/New/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'approval_detail/:id',
        name: '审批详情',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/wel/approval/Components/Detail/index.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'recruitment_publish/:id',
        name: '发布招聘表单',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/Recruitment/Publish/Page/Edit.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_new',
        name: '新增建议',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/Suggestion/New.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_edit/:id',
        name: '修改建议',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/Suggestion/New.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_list',
        name: '发布的建议列表',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/Suggestion/List.vue'),
        meta: noKeepAlive,
      },
      {
        path: 'suggestion_detail/:id',
        name: '建议详情',
        component: () => import(/* webpackChunkName: "hrms" */'@/views/hrms/Suggestion/Detail.vue'),
        meta: noKeepAlive,
      },
    ],
  },
]
