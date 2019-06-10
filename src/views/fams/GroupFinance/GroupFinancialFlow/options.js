const dictsMap = {
	isIncome: {
		1: '收入',
		2: '支出',
	},
}

const columnsMap = [
	{
		prop: 'serialNumber',
		label: '流水号',
	},
	{
		prop: 'isIncome',
		label: '类型',
		type: 'dict',
	},
	{
		prop: 'borrowMoneyType',
		label: '操作对象',
	},
	{
		prop: 'borrowMoneyType',
		label: '操作人',
	},
	{
		prop: 'amount',
		label: '国脉贝',
	},
	{
		prop: 'createTime',
		label: '操作时间',
	},
	{
		prop: 'remake',
		label: '操作说明',
		minWidth: '200',
	},
]

export { columnsMap, dictsMap }