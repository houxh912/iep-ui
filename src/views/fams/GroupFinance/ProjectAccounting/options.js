import { getYear, getMonth } from '@/util/date'
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

const initForm = () => {
  return {
    orgId: '',
    businessDate: '',
    amount: 0,
  }
}

const toDtoForm = (row) => {
  const newForm = {...row}
  newForm.businessYear = getYear(row.businessDate)
  newForm.businessMonth = getMonth(row.businessDate)
  return newForm
}

export { columnsMap, initForm, toDtoForm }