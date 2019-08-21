// import { mergeByFirst } from '@/util/util'
import { genStatus } from '@/const/invoiceConfig'
// org config options
const dictsMap = {
	primaryAudit: {
		0: '待核准',
		1: '已确认',
		2: '已拒绝',
	},
	referType: {
		1: '项目管理类',
		2: '日常管理类',
		3: '其他类',
	},
}

const columnsMap = [
	{
		prop: 'creatorName',
		label: '申请人',
		width: '80',
	},
	{
		prop: 'referType',
		label: '发票类型',
		type: 'dict',
		width: '100',
	},
	{
		prop: 'companyName',
		label: '发票抬头',
	},
	{
		prop: 'totalAmount',
		label: '发票金额',
		width: '100',
	},
	{
		prop: 'createTime',
		label: '申请日期',
		width: '150',
	},
	{
		prop: null,
		label: '状态',
		type: 'custom',
		customFunction: genStatus,
		width: '60',
	},
	{
		prop: 'auditorName',
		label: '部门核准人',
		width: '100',
	},
	{
		prop: 'auditingTime',
		label: '核准日期',
		width: '150',
	},
	{
		prop: 'remarks',
		label: '备注',
	},
]


export { dictsMap, columnsMap }