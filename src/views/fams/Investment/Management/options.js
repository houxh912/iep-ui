// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: { // （1待发布,2审核中,3已发布）
    1: '待发布',
    2: '审核中',
    3: '已发布',
  },
}
const columnsMap = [
  {
    prop: 'allSharesNumber',
    label: '总股本',
  },
  {
    prop: 'sharesUnivalent',
    label: '今日股价',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]
const initForm = () => {
  return {
    id: '',
    orgId: '',//投资组织
    allSharesNumber: 1,//股份数量
    sharesUnivalent: 1,//每股单价
    holdType: '1',//持有类型
    equityType: '1',//股本类型
  }
}

const initInvestmentForm = () => {
  return {
    abilityTag: [],
    allSharesNumber: 0,
    cAllSharesNumber: 0,
    currentShareholding: '',
    equityType: 0,
    hadMoney: 0,
    holdType: 0,
    id: 0,
    investmentNumber: 0,
    issuePrice: 0,
    orgId: 0,
    orgLogo: '',
    orgName: '',
    performanceTrend: [],
    record: [],
    residualShareholding: '',
    shareholderInformation: [],
    sharesUnivalent: 1,
    status: 0,
    targetAmount: 1,
  }
}
const rules = {
  orgId: [
    { required: true, message: '请填写投资组织', trigger: 'blur' },
  ],
  allSharesNumber: [
    { required: true, message: '请填写股份数量且大于0', trigger: 'blur', type: 'number', min: 1 },
  ],
  sharesUnivalent: [
    { required: true, message: '请填写每股单价且大于0', trigger: 'blur', type: 'number', min: 1 },
  ],
}
export {
  rules,
  initForm,
  dictsMap,
  columnsMap,
  initInvestmentForm,
}
