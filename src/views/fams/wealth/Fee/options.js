// import { checkContactUser } from '@/util/rules'
import { mergeByFirst } from '@/util/util'
import { feeStatus } from '@/const/invoiceConfig.js'
const dictsMap = {
  payType: {
    '0': '库存现金',
    '1': '银行存款',
  },
  processStatus: {
    0: '待核准',
    1: '通过',
    2: '驳回',
    3: '转交',
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
    ccOrgName: '',
    companyId: '',
    ccCompanyId: '',
    companyName: '',
    ccCompanyName: '',
    protocolId: '',
    protocolName: '',
    projectId: '',
    projectName: '',
    auditorId: '',
    auditorName: '',
    auditor: {
      id: '',
      name: '',
    },
    creatorName: '',
    financeUserName: '',
    status: '',
    primaryAudit: '',
    remarks: '',
    financialAudit: 0,
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
    width: 55,
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
    label: '部门核准人',
  },
]

const flowRules = {
  bankId: [
    { required: true, message: '请选择支出账户', trigger: 'change' },
  ],
}

const rules = {
  referType: [
    { required: true, message: '请选择报销类型', trigger: 'blur' },
  ],
  orgId: [
    { required: true, message: '请选择报销组织', trigger: 'change' },
  ],
  companyId: [
    { required: true, message: '请选择报销公司', trigger: 'change' },
  ],
  ccOrgId: [
    { required: true, message: '请选择代缴组织', trigger: 'change' },
  ],
  ccCompanyId: [
    { required: true, message: '请选择代缴公司', trigger: 'change' },
  ],
  costFile: [
    { required: false, message: '请上传附件', trigger: 'blur' },
  ],
  auditor: [
    { required: false, trigger: 'change' },
  ],
}

export {
  columnsMap,
  dictsMap,
  rules,
  flowRules,
  initTableForm,
  initForm,
  initFlowForm,
  formToVo,
}
