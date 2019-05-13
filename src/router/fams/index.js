import Layout from '@/page/index/index'
export default [
  {
    path: '/fams_spa',
    component: Layout,
    redirect: '/fams_spa/withdraw_detail',
    children: [
      {
        path: 'withdraw_detail/:id',
        name: '提现详情',
        component: () => import('@/views/fams/wealth/Withdraw/Detail.vue'),
      },
      {
        path: 'salary_detail/:id',
        name: '工资管理详情',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/Detail.vue'),
      },
      {
        path: 'salary_person_detail/:id',
        name: '工资管理个人详情',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/PersonDetail.vue'),
      },
      {
        path: 'payroll_detail/:id',
        name: '工资条',
        component: () => import('@/views/fams/FinancialManagement/SalaryManagement/PayrollDetail.vue'),
      },
      {
        path: 'invoice_detail/:id',
        name: '发票详情',
        component: () => import('@/views/fams/wealth/Invoice/Page/Detail.vue'),
      },
    ],
  },
]
