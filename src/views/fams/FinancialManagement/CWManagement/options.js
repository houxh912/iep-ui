const dictsMap = {
  status: {
    '0': '待审',
    '1': '待发放',
    '2': '已发放',
    '3': '提现失败',
    '4': '提现失败',
  },
}

const columnsMap = [
  {
    prop: 'applyName',
    label: '申请人',
    width: '70',
  },
  {
    prop: 'amount',
    label: '提现金额',
    width: '80',
  },
  {
    prop: 'deductionInvoice',
    label: '发票抵扣金额',
    width: '110',
  },
  {
    prop: 'taxation',
    label: '税费',
    width: '70',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'auditorName',
    label: '核准人',
  },
  {
    prop: 'createTime',
    label: '申请日期',
  },
  {
    prop: 'auditingTime',
    label: '核准日期',
  },
  {
    prop: 'grantTime',
    label: '发放日期',
  },
  {
    prop: 'remarks',
    label: '备注',
    type: 'detail',
  },
]

const initForm = () => {
  return {
    'amount': 0,
    'deductionInvoice': 0,
  }
}

const initGrantForm = () => {
  return {
    ids: [],
    remarks: '',
    offlineCompany: '',
    payType: 0,
    bankAmount: '',
  }
}

const rules = {
  offlineCompany: [
    { required: true, message: '请选择公司', trigger: 'blur' },
  ],
  bankAmount: [
    { required: true, message: '请选择银行账户', trigger: 'blur' },
  ],
}

export { columnsMap, dictsMap, initForm, initGrantForm, rules }
