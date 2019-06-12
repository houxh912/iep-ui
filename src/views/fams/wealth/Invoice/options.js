// import { checkContactUser } from '@/util/rules'

const dictsMap = {
  status: {
    0: '待提交',
    1: '部门审批',
    2: '财务审批',
    3: '已完成',
  },
  referType: {
    1: '项目管理类',
    2: '日常管理类',
    3: '其他类(发票抵税)',
  },
  invoiceType: {
    1: '增值税专用发票',
    2: '增值税普通发票',
    3: '其他',
  },
}

function initTableForm () {
  return {
    type: [],
    invoiceType: '',
    amount: 0,
  }
}
function initForm () {
  return {
    id: '',
    referType: 1,
    orgId: '',
    orgName: '',
    companyId: '',
    companyName: '',
    projectId: '',
    projectName: '',
    auditor: {
      id: 0,
      name: '',
    },
    financialAudit:0,
    relations: [],
  }
}

const columnsMap = [
	{
		prop: 'referType',
		label: '报销类型',
		type: 'dict',
	},
	{
		prop: 'companyName',
		label: '报销抬头',
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
	{
		prop: 'auditingTime',
		label: '审核日期',
	},
]

const rules = {
  referType: [
    { required: true, message: '请选择报销类型', trigger: 'blur' },
  ],
  orgId: [
    { required: true, message: '请选择报销组织', trigger: 'blur' },
  ],
  companyId: [
    { required: true, message: '请选择报销抬头', trigger: 'blur' },
  ],
  projectId: [
    { required: true, message: '请选择项目', trigger: 'blur' },
  ],
  auditor: [
    { required: false, trigger: 'blur' },
  ],
}

export {
	columnsMap,
	dictsMap,
	rules,
	initTableForm,
	initForm,
}
