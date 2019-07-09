import { getYear, getMonth } from '@/util/date'
const columnsMap = [
	{
		prop: 'projectName',
		label: '项目名称',
	},
	{
		prop: 'projectPaymentTime',
		label: '回款时间',
		type: 'date',
		formatString: 'YYYY-MM-DD',
	},
	{
		prop: 'paymentAmount',
		label: '回款计划金额',
	},
	{
		prop: 'contractAmount',
		label: '合同金额',
	},
	{
		prop: 'incomeAmount',
		label: '到账金额',
	},
]

const initForm = () => {
  return {
    projectName: '',
    contractAmount: 0,
    publisher: '',
    serialNo: '',
    publisherList: {id:'',name:''},
    projectManagerList: {id:'',name:''},
    mktManagerList: {id:'',name:''},
    projectTime: '',
    endTime: '',
  }
}
const initSearchForm = () => {
  return {
		date: '',
    signatureStatus: '',
    onlyYear: false,
  }
}
const toDtoSearchForm = (row) => {
	const newForm = {...row}
	newForm.year = getYear(newForm.date) || null
	newForm.month = getMonth(newForm.date) || null
	if (newForm.onlyYear) {
		delete newForm.month
	}
  return newForm
}
export { columnsMap, initForm, initSearchForm, toDtoSearchForm }