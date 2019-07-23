// import { mergeByFirst } from '@/util/util'

const initForm = () => {
	return {
		id: '',
		// isWagePay: 0, // (0-不是，1-是)
		accountName: '',
		// companyIds: [],
		// isInvoiceingPay: 0, // (0-不是，1-是)
	}
}

const columnsMap = [
	{
		prop: 'id',
		label: 'ID',
		width: 80,
	},
	{
		prop: 'accountName',
		label: '银行户头',
	},
	{
		prop: 'updateTime',
		label: '操作时间',
		width: '170px',
	},
]

export {
	columnsMap,
	initForm,
}
