// import { mergeByFirst } from '@/util/util'
const dictsMap = {
	incomeMode: {
		'0': '库存现金',
		'1': '银行存款',
	},
}

const columnsMap = [
	{
		prop: 'createTime',
		label: '时间',
		type: 'date',
		formatString: 'YYYY-MM-DD',
	},
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
		expenditureId: '',
		incomeMode: '0',
		companyId: '',
		accountId: '',
		protocolName: '',
		projectId: '',
		projectName: '',
		projectNumber: '',
		amount: 0,
		// invoiceAmount: 0,
		remarks: '',
		typeValue: '',
		invoicingTax: '',
		interestRate: '',
	}
}

const toDtoForm = (row) => {
	const newForm = { ...row }
	newForm.parentType = newForm.type[0]
	newForm.type = newForm.type[1]
	return newForm
}

const rules = {
	type: [
		{ required: true, type: 'array', message: '请输入收入类型', trigger: 'change' },
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
		{ required: true, message: '请输入收入公司', trigger: 'change' },
	],
	accountId: [
		{ required: true, message: '请输入银行户头', trigger: 'change' },
	],
	amount: [
		{ required: true, message: '请输入支出金额', trigger: 'blur', type: 'number' },
	],
}

export {
	dictsMap,
	columnsMap,
	initForm,
	toDtoForm,
	rules,
}
