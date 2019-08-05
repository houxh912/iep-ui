// import { mergeByFirst } from '@/util/util'

const dictsMap = {
	status: {
		0: '待提交',
		1: '待确认',
		2: '已确认',
		3: '拒绝',
	},
}

const columnsMap = [
	{
		prop: 'creatorName',
		label: '申请人',
	},
	{
		prop: 'buyerName',
		label: '购买方',
	},
	{
		prop: 'companyName',
		label: '销售方',
		type: 'detail',
	},
	{
		prop: 'amount',
		label: '开票金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
		width: '150',
	},
	{
		prop: 'status',
		label: '状态',
		type: 'dict',
	},
	{
		prop: 'auditorName',
		label: '核准人',
	},
	{
		prop: 'auditingTime',
		label: '核准日期',
		width: '150',
	},
]

export { dictsMap, columnsMap }