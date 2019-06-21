// import { mergeByFirst } from '@/util/util'
// org config options
const dictsMap = {
  status: {
    0: '待提交',
    1: '待初级审核',
    2: '初级审核确认',
    3: '初级审核驳回',
    4: '财务审核通过',
    5: '财务审核驳回',
  },
}

const columnsMap = [
	{
		prop: 'id',
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