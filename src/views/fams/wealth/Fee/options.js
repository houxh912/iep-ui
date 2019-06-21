// import { checkContactUser } from '@/util/rules'
import { mergeByFirst } from '@/util/util'
import { feeStatus } from '@/const/invoiceConfig.js'
const dictsMap = {
  payType: {
    '0': '库存现金',
    '1': '银行存款',
  },
  status: feeStatus,
}
function initTableForm () {
  return {
    type: [],
    bank: '',
    amount: 0,
  }
}

function initFlowForm () {
  return {
    costId: '',
    bankId: '',
    companyId: '',
    payType: '0',
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
    auditorId: '',
    auditorName: '',
    auditor: {
      id: 0,
      name: '',
    },
    creatorName: '',
    financialName: '',
    status: '',
    primaryAudit: '',
    remarks: '',
    financialAudit:0,
    relations: [],
    processes: [],
  }
}

const formToVo = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.auditor = {
    id: newForm.auditorId,
    name: newForm.auditorName,
  }
  return newForm
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
  initFlowForm,
  formToVo,
}
