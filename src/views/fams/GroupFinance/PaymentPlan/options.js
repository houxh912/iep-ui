
const columnsMap = [
	{
		prop: 'orgName',
		label: '组织名称',
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
		publisherList: { id: '', name: '' },
		projectManagerList: { id: '', name: '' },
		mktManagerList: { id: '', name: '' },
		projectTime: '',
		endTime: '',
	}
}
export { columnsMap, initForm }