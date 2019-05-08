// import { mergeByFirst } from '@/util/util'

const initForm = () => {
	return {
		isWagePay: 0, // (0-不是，1-是)
		accountName: '',
		companyId: '',
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
		prop: 'companyName',
		label: '公司名称',
	},
	{
		prop: 'updateTime',
		label: '操作时间',
	},
]

export {
	columnsMap,
	initForm,
}
