import { feeStatus } from '@/const/invoiceConfig.js'
const dictsMap = {
	status: feeStatus,
}
const columnsMap = [
	{
		prop: 'costId',
		label: 'ID',
	},
	{
		prop: 'creatorName',
		label: '申请人',
	},
	{
		prop: 'totalAmount',
		label: '报销金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
		width: '170',
	},
	{
		prop: 'status',
		label: '状态',
		type: 'dict',
		width: '100',
	},
	{
		prop: 'auditorName',
		label: '部门核准人',
	},
]


export { dictsMap, columnsMap }