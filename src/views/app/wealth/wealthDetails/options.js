
const dictsMap = {
	investmentMoneyType: {
	  '0': '国脉贝',
	  '1': '现金',
	},
  }
  
  const statusMap = {
	'1': 2,
	'2': 3,
	'3': 3,
  }
  
  const initForm = () => {
	return {
	  investmentNumber: '', //股份数量
	  totalAmount: '',//投资金额
	  investmentMoneyType: '0',//支付方式（0国脉贝，1现金）
		investmentId: '',//投资
		orgId: '',//投资组织
		orgName: '',//投资组织名
		targetAmount: 0,//目标金额
		tradingPrice: 0,//每股单价
		remainingShares: 0,//剩余股数
	}
  }
  
  const formToDto = (row) => {
	const newForm = {...row}
	return newForm
  }
  
  const rules = {
		investmentNumber: [
		{ type:'number', required: true, message: '输入的股份数量至少大于最低投资股份数', trigger: 'blur' },
	],
	totalAmount: [
	  { required: true, message: '输入的金额至少大于或等于每股单价', trigger: 'blur' },
	],
	investmentMoneyType: [
	  { required: true, message: '请选择支付方式', trigger: 'blur' },
	],
	orgId: [
	  { required: true, message: '请选择投资组织', trigger: 'blur' },
	],
	}

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
  
  export { initForm, dictsMap, statusMap, rules, formToDto }