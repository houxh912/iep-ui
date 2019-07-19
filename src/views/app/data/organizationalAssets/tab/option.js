export const dataAssetsData = [
  {
    name: '人力资产',
    prop: 'human_assets',
    children: [
      {
        name: '员工数量',
        prop: 'member',
      }, {
        name: '标签质量',
        prop: 'memberTag',
      }, {
        name: '员工证书',
        prop: 'certificate',
      }, {
        name: '对接专家',
        prop: 'expert',
      },
    ],
  }, {
    name: '客户资产',
    prop: 'customer_assets',
    children: [
      {
        name: '核心客户',
        prop: 'a_customer',
      }, {
        name: '良好客户',
        prop: 'b_customer',
      }, {
        name: '一般客户',
        prop: 'c_customer',
      }, {
        name: '潜在客户',
        prop: 'd_customer',
      }, {
        name: '核心战略伙伴',
        prop: 'a_partner',
      }, {
        name: '良好战略伙伴',
        prop: 'b_partner',
      }, {
        name: '一般战略伙伴',
        prop: 'c_partner',
      }, {
        name: '潜在战略伙伴',
        prop: 'd_partner',
      },
    ],
  }, {
    name: '项目资产',
    prop: 'project_assets',
    children: [
      {
        name: '百万级项目',
        prop: 'a_project',
      }, {
        name: '五十万以上项目',
        prop: 'b_project',
      }, {
        name: '二十万以上项目',
        prop: 'c_project',
      }, {
        name: '二十万以下项目',
        prop: 'd_project',
      },
    ],
  }, {
    name: '产品资产',
    prop: 'product_assets',
    children: [],
  }, {
    name: '平台资产',
    prop: 'platform_assets',
    children: [],
  }, {
    name: '品牌资产',
    prop: 'brand_assets',
    children: [
      {
        name: '专利',
        prop: 'a_brand',
      }, {
        name: '软著',
        prop: 'd_brand',
      }, {
        name: '荣誉',
        prop: 'b_brand',
      }, {
        name: '高新',
        prop: 'c_brand',
      }, {
        name: '报告类',
        prop: 'prop',
      },
    ],
  },
]

export const financialAssetsData = [
  {
    name: '应收款资产',
    prop: 'contractualReceive',
    children: [],
  }, {
    name: '集团往来账',
    prop: 'groupContacts',
    children: [],
  }, {
    name: '余额',
    prop: 'balance',
    children: [
      {
        name: '现金',
        prop: 'cashInStock',
      }, {
        name: '银行',
        prop: 'bankDeposit',
      },
    ],
  }, {
    name: '固定资产',
    prop: 'fixedAssets',
    children: [],
  }, {
    name: '对外资产',
    prop: 'investment',
    children: [],
  }, {
    name: '负资产',
    prop: 'borrow',
    children: [
      {
      //   name: '呆账',
      //   prop: 'prop',
      // }, {
      //   name: '坏账',
      //   prop: 'prop',
      // }, {
        name: '借款',
        prop: 'borrow',
      },
    ],
  }, {
    name: '待签项目款',
    prop: 'pendingProjectPayment',
    children: [
      {
        name: '执行中',
        prop: 'atype',
      }, {
        name: '方案阶段',
        prop: 'btype',
      }, {
        name: '意向阶段',
        prop: 'ctype',
      }, {
        name: '政府补贴',
        prop: 'governmentSubsidies',
      },
    ],
  }, {
    name: '外部投资',
    prop: 'outInvestment',
    children: [
      {
        name: '天使轮',
        prop: 'angelWheel',
      }, {
        name: 'pre-A轮',
        prop: 'preAWheel',
      }, {
        name: 'A轮',
        prop: 'awheel',
      }, {
        name: 'B轮',
        prop: 'bwheel',
      }, {
        name: 'C轮',
        prop: 'cwheel',
      },
    ],
  }, {
    name: '投资收益',
    prop: 'investmentProfit',
    children: [],
  }, {
    name: '集团奖励',
    prop: 'groupReward',
    children: [],
  }, {
    name: '其他收益',
    prop: 'other',
    children: [],
  },
]
