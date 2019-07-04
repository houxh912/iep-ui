import { getYear, getMonth } from '@/util/date'
const columnsMap = [
	{
		prop: 'projectNum',
		label: '项目编号',
	},
	{
		prop: 'projectName',
		label: '项目名称',
	},
	{
		prop: 'createTime',
		label: '立项时间',
		type: 'date',
		formatString: 'YYYY-MM-DD',
	},
	{
		prop: 'amount',
		label: '合同金额',
	},
	{
		prop: 'invoicingAmount',
		label: '开票金额',
	},
]

const rules = {
	orgId: [
		{ required: true, message: '请选择组织', trigger: 'blur' },
	],
	businessDate: [
		{ required: true, message: '请选择时间', trigger: 'blur' },
	],
	amount: [
		{ required: true, message: '请输入指标金额', trigger: 'blur', type: 'number' },
	],
}

const initDetailForm = () => {
	return {
		projectName: '',
		contractAmount: 0,
		publisher: '',
		serialNo: '',
		publisherList: { id: '', name: '' },
		projectManagerList: { id: '', name: '' },
		mktManagerList: { id: '', name: '' },
		projectTime: '',
		endTime: '',
	}
}

const initForm = () => {
	return {
		orgId: '',
		businessDate: '',
		amount: 0,
	}
}

const initSearchForm = () => {
	return {
		signatureStatus: '',
	}
}
const toDtoSearchForm = (row) => {
	const newForm = { ...row }
	newForm.year = getYear(newForm.date) || null
	newForm.month = getMonth(newForm.date) || null
	if (newForm.onlyYear) {
		delete newForm.month
	}
	return newForm
}

const toDtoForm = (row) => {
	const newForm = { ...row }
	newForm.businessYear = getYear(row.businessDate) || null
	newForm.businessMonth = getMonth(row.businessDate) || null
	delete newForm.businessDate
	return newForm
}
export { columnsMap, initForm, initDetailForm, toDtoForm, initSearchForm, toDtoSearchForm, rules }