// import { mergeByFirst } from '@/util/util'
const dictsMap = {
  incomeMode: {
    '0': '库存现金',
    '1': '银行存款',
  },
}

const columnsMap = [
	{
		prop: 'amount',
		label: '金额',
	},
	{
		prop: 'typeValue',
		label: '类型',
	},
	{
		prop: 'orgName',
		label: '组织',
	},
	{
		prop: 'companyName',
		label: '线下公司',
	},
	{
		prop: 'incomeMode',
		label: '收入方式',
		type: 'dict',
	},
	{
		prop: 'accountName',
		label: '银行账户',
	},
	{
		prop: 'remarks',
		label: '备注',
	},
]

const initForm = () => {
	return {
		type: [],
		createTime: '',
		orgId: '',
		invoiceOrgId: '',
		protocolId: '',
		orgName: '',
		incomeMode: '0',
		companyId: '',
		accountId: '',
		amount: 0,
		invoiceAmount: 0,
		remarks: '',
		typeValue: '',
		invoicingTax:'',
		interestRate:'',
	}
}

const toDtoForm = (row) => {
	const newForm = {...row}
	newForm.type = newForm.type[1]
	newForm.parentType = newForm.type[0]
	return newForm
}

const rules = {
  type: [
    { required: true, message: '请输入收入类型', trigger: 'blur' },
	],
	createTime: [
    { required: true, message: '请输入收入时间', trigger: 'blur' },
	],
	orgName: [
    { required: true, message: '请输入收入组织', trigger: 'blur' },
	],
	incomeMode: [
    { required: true, message: '请输入收入方式', trigger: 'blur' },
  ],
	companyId: [
    { required: true, message: '请输入收入公司', trigger: 'blur' },
	],
	accountId: [
    { required: true, message: '请输入银行户头', trigger: 'blur' },
	],
	amount: [
	{ required: true, message: '支出金额为数字且大于0', trigger: 'blur', type:'number', min:1 },
	],
}

export {
	dictsMap,
	columnsMap,
	initForm,
	toDtoForm,
	rules,
}
