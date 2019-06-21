// import { checkContactUser } from '@/util/rules'

const dictsMap = {
  status: {
    0: '待提交',
    1: '待初级审核',
    2: '初级审核确认',
    3: '初级审核驳回',
    4: '财务审核通过',
    5: '财务审核驳回',
  },
  referType: {
    1: '项目管理类',
    2: '日常管理类',
    3: '其他类(发票抵税)',
  },
}

function initTableForm () {
  return {
    type: [],
    bank: '',
    amount: 0,
  }
}
function initForm () {
  return {
    costId: '',
    isSubstitute: 0,
    orgId: '',
    costFile: '',
    ccOrgId: '',
    orgName: '',
    companyId: '',
    ccCompanyId: '',
    companyName: '',
    protocolId: '',
    protocolName: '',
    projectId: '',
    projectName: '',
    auditor: {
      id: 0,
      name: '',
    },
    creatorName: '',
    financialName: '',
    primaryAudit: '',
    auditorName: '',
    remarks: '',
    financialAudit:0,
    relations: [],
    processes: [],
  }
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
  remarks: [
    { required: false, trigger: 'blur' },
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
