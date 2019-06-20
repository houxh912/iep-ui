// import { mergeByFirst } from '@/util/util'
import { genStatus } from '@/const/invoiceConfig'
// org config options
const dictsMap = {
  financialAudit: {
    0: '待确认',
    1: '已确认',
  },
  referType: {
    1: '项目管理类',
    2: '日常管理类',
    3: '其他类',
  },
  invoiceType: {
    1: '增值税专用发票',
    2: '增值税普通发票',
    3: '其他',
  },
}

const columnsMap = [
  {
    prop: 'creatorName',
    label: '申请人',
  },
  {
		prop: 'referType',
		label: '发票类型',
		type: 'dict',
	},
	{
		prop: 'companyName',
		label: '发票抬头',
	},
	{
		prop: 'totalAmount',
		label: '发票金额',
	},
	{
		prop: 'createTime',
		label: '申请日期',
  },
	{
		prop: null,
    label: '状态',
    type: 'custom',
    customFunction: genStatus,
	},
	{
		prop: 'auditorName',
    label: '部门审批人',
	},
	{
		prop: 'auditingTime',
    label: '审核日期',
	},
	{
		prop: 'remarks',
    label: '备注',
	},
]

export { dictsMap, columnsMap }