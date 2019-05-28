const tabList = [
  {
    label: '转出',
    value: 'outOrgId',
  },
  {
    label: '转入',
    value: 'inOrgId',
  },
]

const columnsMap = [
	{
		prop: 'inOrgName',
		label: '流水号',
	},
	{
		prop: 'amount',
		label: '类型',
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
		prop: 'repaymentTime',
		label: '国脉贝',
	},
	{
		prop: 'repaymentTime',
		label: '操作时间',
	},
	{
		prop: 'repaymentTime',
		label: '操作说明',
	},
]

export { columnsMap, tabList }