import { checkContactUser } from '@/util/rules'

const dictsMap = {
  status: {
    0: '待提交',
    1: '待确认',
    2: '已确认',
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
		prop: 'status',
		label: '状态',
		type: 'dict',
	},
	{
		prop: 'auditorName',
		label: '审核人',
	},
	{
		prop: 'auditingTime',
		label: '审核日期',
	},
]

const rules = {
  referType: [
    { required: true, message: '请选择报销类型', trigger: 'blur' },
  ],
  companyId: [
    { required: true, message: '请选择公司抬头', trigger: 'blur' },
  ],
  projectId: [
    { required: true, message: '请选择项目', trigger: 'blur' },
  ],
  auditor: [
    { required: true, validator: checkContactUser('审批人'),  trigger: 'blur' },
  ],
}

export {
	columnsMap,
	dictsMap,
	rules,
}
