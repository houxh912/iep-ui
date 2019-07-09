import Layout from '@/page/index/index'
export default [
  {
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [
      {
        path: 'index',
        name: '后台首页',
        component: () => import('@/views/wel/index/'),
      },
      {
        path: 'master',
        name: '推荐师父',
        component: () => import('@/views/wel/master/'),
      },
      {
        path: 'masterConfirm/:id',
        name: '确认师父',
        component: () => import('@/views/wel/master/confirm'),
      },
      {
        path: 'account-settings',
        name: '个人设置',
        component: () => import('@/views/wel/account-settings/index'),
        redirect: '/wel/account-settings/base',
        children: [
          {
            path: 'base',
            name: 'BaseSettings',
            component: () => import('@/views/wel/account-settings/BaseSetting'),
            meta: { title: '基本设置' },
          },
          {
            path: 'security',
            name: 'SecuritySettings',
            component: () => import('@/views/wel/account-settings/Security'),
            meta: { title: '安全设置' },
          },
          // {
          //   path: 'notification',
          //   name: 'NotificationSettings',
          //   component: () => import('@/views/wel/account-settings/Notification'),
          // },
        ],
      },
      {
        path: 'org',
        name: '选择组织',
        component: () => import('@/views/wel/org/index'),
      },
      {
        path: 'desktop',
        name: '领导桌面',
        component: () => import('@/views/wel/desktop/index'),
      },
      {
        path: 'origanaze_week_detail/:id',
        name: '组织周报详情页',
        component: () => import('@/views/wel/desktop/OriganazeReport/OriganazeWeekDetail.vue'),
      },
      {
        path: 'origanaze_month_detail/:id',
        name: '组织月报详情页',
        component: () => import('@/views/wel/desktop/OriganazeReport/OriganazeMonthDetail.vue'),
      },
      {
        path: 'staff_week_detail/:id',
        name: '个人周报详情页',
        component: () => import('@/views/wel/desktop/StaffReport/StaffWeekDetail.vue'),
      },
      {
        path: 'staff_month_detail/:id',
        name: '个人月报详情页',
        component: () => import('@/views/wel/desktop/StaffReport/StaffMonthDetail.vue'),
      },
      {
        path:'visiting_log',
        name:'拜訪日志',
        component: () => import('@/views/wel/desktop/VisitingLog/index'),     
      },
      {
        path:'project_report',
        name:'项目周报',
        component: () => import('@/views/wel/desktop/ProjectReport/index'),     
      },
      {
        path:'staff_report',
        name:'员工周月报',
        component: () => import('@/views/wel/desktop/StaffReport/index'),     
      },
      {
        path:'origanaze_report',
        name:'组织周月报',
        component: () => import('@/views/wel/desktop/OriganazeReport/index'),     
      },
      {
        path:'budget_list_detail',
        name:'领导桌面项目列表',
        component: () => import('@/views/wel/desktop/BudgetListDetail'),     
      },
      {
        path:'relationship_manage',
        name:'关系管理',
        component: () => import('@/views/wel/RelationshipManage/index'),     
      },
    ],
  },
]