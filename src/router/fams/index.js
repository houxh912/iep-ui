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
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/Withdraw/Detail.vue'),
      },
      {
        path: 'salary_detail/:id',
        name: '工资管理详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/FinancialManagement/SalaryManagement/Detail.vue'),
      },
      {
        path: 'salary_person_detail/:id',
        name: '工资管理个人详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/FinancialManagement/SalaryManagement/PersonDetail.vue'),
      },
      // WARNING: 字典项不要删除
      {
        path: 'payroll_detail/:id',
        name: '工资条',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/FinancialManagement/SalaryManagement/PayrollDetail.vue'),
      },
      {
        path: 'invoice_detail/:id',
        name: '报销详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/Invoice/Detail.vue'),
      },
      {
        path: 'invoice_edit/:id',
        name: '报销编辑',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/Invoice/Edit.vue'),
      },
      {
        path: 'fee_detail/:id',
        name: '费用详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/Fee/Detail.vue'),
      },
      {
        path: 'fee_edit/:id',
        name: '费用编辑',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/Fee/Edit.vue'),
      },
      {
        path: 'billing_edit/:id',
        name: '开票编辑',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/BillingNotice/Edit.vue'),
      },
      {
        path: 'billing_detail/:id',
        name: '开票详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/BillingNotice/Detail.vue'),
      },
      {
        path: 'fund_transfer_edit/:id',
        name: '新增资金调拨',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/FundTransfer/Edit.vue'),
      },
      {
        path: 'fund_transfer_detail/:id',
        name: '资金调拨详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/FundTransfer/Detail.vue'),
      },
      {
        path: 'org_borrow_detail/:id',
        name: '组织拆借详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgBorrow/Components/OrgBorrowDetail/index.vue'),
      },
      {
        path: 'management_edit/:id',
        name: '新增投资管理',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/Investment/Management/Edit.vue'),
      },
      {
        path: 'change_shareholder/:id',
        name: '变更股东',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/Investment/Management/ChangeShareholder/index.vue'),
      },
      {
        path: 'union_borrow_detail/:id',
        name: '集团拆借详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgBorrow/Components/UnionBorrowDetail/index.vue'),
      },
      {
        path: 'accounts_receivable',
        name: '合同应收账款',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/FinancialManagement/WorkBench/AccountsReceivableDetail/index.vue'),
      },
      {
        path: 'other_receivables',
        name: '其他应收款',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/FinancialManagement/WorkBench/OtherReceivablesDetail/index.vue'),
      },
      {
        path: 'project_accounting/:id',
        name: '项目核算详情',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/ProjectAccounting/Detail.vue'),
      },
      {
        path: 'organization_transfer',
        name: '组织转账',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/OrganizationTransfer/index.vue'),
      },
      {
        path: 'organization_reward',
        name: '组织打赏/扣减',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/OrganizationReward/index.vue'),
      },
      {
        path: 'group_reward',
        name: '集团打赏/扣减(组织)',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/GroupReward/index.vue'),
      },
      {
        path: 'group_reward_user',
        name: '集团打赏/扣减(个人)',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/GroupRewardUser/index.vue'),
      },
      {
        path: 'wealth_flow/:id',
        name: '提现申请(个人)',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/wealth/WealthFlow/index.vue'),
      },
      {
        path: 'project/:id',
        name: '项目核算',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/ProjectAccounting/index.vue'),
      },
      {
        path: 'org_payment_plan/:id',
        name: '组织回款计划',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/PaymentPlan/index.vue'),
      },
      {
        path: 'union_payment_plan',
        name: '集团回款计划',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/PaymentPlan/index.vue'),
      },
      {
        path: 'business_indicator',
        name: '本组织业务指标',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/OrgAssets/BusinessIndicator/index.vue'),
      },
      {
        path: 'union_month_lf',
        name: '集团月份盈亏',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/UnionProfitAndLoss/MonthDetail/index.vue'),
      },
      {
        path: 'iep_fee',
        name: '内网使用费',
        component: () => import(/* webpackChunkName: "fams" */'@/views/fams/GroupFinance/IepFee/index.vue'),
      },
    ],
  },
]
