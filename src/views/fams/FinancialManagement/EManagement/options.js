// import { mergeByFirst } from '@/util/util'
const dictsMap = {
	expenditureMode: {
		'0': '库存现金',
		'1': '银行存款',
	},
}

const columnsMap = [
	{
		prop: 'createTime',
		label: '时间',
		type: 'date',
		width: '150',
		formatString: 'YYYY-MM-DD',
	},
	{
		prop: 'amount',
		label: '金额',
		width: '80',
	},
	{
		prop: 'typeValue',
		label: '类型',
	},
	{
		prop: 'orgName',
		label: '组织',
		type: 'detail',
	},
	{
		prop: 'companyName',
		label: '线下公司',
		type: 'detail',
	},
	{
		prop: 'expenditureMode',
		label: '支出方式',
		type: 'dict',
		width: '100',
	},
	{
		prop: 'bankAccount',
		label: '银行账户',
		type: 'detail',
	},
	{
		prop: 'remarks',
		label: '备注',
	},
]

const initSearchForm = () => {
	return {
		rangeTime: [],
		type: [],
		orgId: '',
		companyName: '',
		expenditureMode: '',
		bankAccount: '',
		remarks: '',
	}
}

const initForm = () => {
	return {
		incomeIds: [],
		type: [],
		createTime: '',
		orgId: '',
		invoiceOrgId: '',
		orgName: '',
		expenditureMode: '0',
		companyId: '',
		accountId: '',
		protocolId: '',
		protocolName: '',
		projectId: '',
		projectName: '',
		projectNumber: '',
		serialNo: '', // serialNo 项目编号
		amount: '',
		remarks: '',
		realName: '',
		invoicingTax: '',
		interestRate: '',
		estimatedRefundTime: '',
		relations: [],
		relationId: '',
	}
}

const toDtoForm = (row) => {
	const newForm = { ...row }
	newForm.type = newForm.type[1]
	return newForm
}

const toDtoSearchForm = (row) => {
	const newForm = { ...row }
	newForm.startTime = row.rangeTime[0]
	newForm.endTime = row.rangeTime[1]
	delete newForm.rangeTime
	return newForm
}

const rules = {
	type: [
		{ required: true, type: 'array', message: '请输入支出类型', trigger: 'change' },
	],
	createTime: [
		{ required: true, message: '请输入支出时间', trigger: 'blur' },
	],
	orgName: [
		{ required: true, message: '请输入支出组织', trigger: 'blur' },
	],
	expenditureMode: [
		{ required: true, message: '请输入支出方式', trigger: 'blur' },
	],
	companyId: [
		{ required: true, message: '请输入支出公司', trigger: 'change' },
	],
	accountId: [
		{ required: true, message: '请输入银行户头', trigger: 'change' },
	],
	amount: [
		{ required: true, message: '请输入支出金额', trigger: 'blur', type: 'number' },
	],
}

const warningText = '和项目相关的收入/费用，请关联具体项目（未审核项目无法关联财务数据）'

export {
	dictsMap,
	columnsMap,
	initForm,
	toDtoForm,
	rules,
	warningText,
	initSearchForm,
	toDtoSearchForm,
}
