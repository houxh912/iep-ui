import { getYear } from '@/util/date'

const rules = {
	orgId: [
		{ required: true, message: '请选择组织', trigger: 'blur' },
	],
	businessDate: [
		{ required: true, message: '请选择日期', trigger: 'blur' },
	],
	amount: [
		{ type: 'number', required: true, message: '请输入日期', trigger: 'blur' },
	],
}

const columnsMap = [
	{
		prop: 'orgName',
		label: '组织名称',
	},
	{
		prop: 'amount',
		label: '业务指标(元)',
	},
	{
		prop: 'projectAmount',
		label: '项目金额',
	},
	{
		prop: 'contractAmount',
		label: '合同金额',
	},
	{
		prop: 'projectIncome',
		label: '到账金额',
	},
	{
		prop: 'signedAmount',
		label: '待签金额',
	},
	{
		prop: 'invoicingAmount',
		label: '开票金额',
	},
]

function initForm () {
	return {
		year: '',
		amount: '',
	}
}

const initSearchForm = () => {
	return {
		orgName: '',
		businessYear: '',
	}
}

const toDtoSearchForm = (row) => {
	const newForm = { ...row }
	newForm.businessYear = getYear(row.businessYear) || null
	return newForm
}

const toDtoForm = (row) => {
	const newForm = { ...row }
	newForm.year = getYear(row.year) || null
	return newForm
}

export { columnsMap, initForm, toDtoForm, initSearchForm, toDtoSearchForm, rules }