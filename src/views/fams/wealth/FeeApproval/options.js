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
		prop: 'totalAmount',
		label: '报销金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
	},
	{
		prop: 'status',
    label: '状态',
    type: 'dict',
	},
	{
		prop: 'auditorName',
    label: '部门审批人',
	},
]


export { dictsMap, columnsMap }