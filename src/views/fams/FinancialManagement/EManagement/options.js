﻿// import { mergeByFirst } from '@/util/util'
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
		width: '150',
	},
	{
		prop: 'companyName',
		label: '线下公司',
		width: '220',
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
		width: '250',
	},
	{
		prop: 'remarks',
		label: '备注',
	},
]

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
		invoicingTax: '',
		interestRate: '',
		estimatedRefundTime: '',
		relations: [],
	}
}

const toDtoForm = (row) => {
	const newForm = { ...row }
	newForm.type = newForm.type[1]
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

export {
	dictsMap,
	columnsMap,
	initForm,
	toDtoForm,
	rules,
}
