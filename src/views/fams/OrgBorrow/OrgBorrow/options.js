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
		prop: 'expenditureMode',
		label: '支出方式',
		type: 'dict',
	},
	{
		prop: 'bankAccount',
		label: '银行账户',
	},
	{
		prop: 'remarks',
		label: '备注',
	},
]

const initForm = () => {
	return {
		orgId: '',
	}
}
export {
	dictsMap,
	columnsMap,
	initForm,
}
