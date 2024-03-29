// import { checkContactUser } from '@/util/rules'
import { genStatus } from '@/const/invoiceConfig'

const dictsMap = {
  processStatus: {
    0: '待核准',
    1: '通过',
    2: '驳回',
    3: '转交',
  },
  status: {
    0: '待提交',
    1: '部门核准',
    2: '财务核准',
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
      id: '',
      name: '',
    },
    creatorName: '',
    financialName: '',
    primaryAudit: '',
    auditorName: '',
    remarks: '',
    financialAudit: 0,
    relations: [],
    processes: [],
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
    prop: null,
    label: '状态',
    type: 'custom',
    customFunction: genStatus,
  },
  {
    prop: 'auditorName',
    label: '部门核准人',
  },
  {
    prop: 'auditingTime',
    label: '核准日期',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]

const rules = {
  referType: [
    { required: true, message: '请选择报销类型', trigger: 'blur' },
  ],
  orgId: [
    { required: true, message: '请选择报销组织', trigger: 'change' },
  ],
  companyId: [
    { required: true, message: '请选择报销抬头', trigger: 'change' },
  ],
  projectId: [
    { required: true, message: '请选择项目', trigger: 'change' },
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
