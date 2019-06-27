const initForm = () => {
  return {
    incomeIds: [],
    type: [],
    createTime: '',
    orgId: '',
    invoiceOrgId: '',
    orgName: '',
    expenditureMode: '0',
    companyId: '',
    accountId: '',
    protocolId: '',
    protocolName: '',
    projectId: '',
    projectName: '',
    amount: '',
    remarks: '',
    invoicingTax: '',
    interestRate: '',
    estimatedRefundTime: '',
  }
}

const rules = {
  type: [
    { required: true, message: '请输入支出类型', trigger: 'blur' },
  ],
  createTime: [
    { required: true, message: '请输入支出时间', trigger: 'blur' },
  ],
  orgName: [
    { required: true, message: '请输入支出组织', trigger: 'blur' },
  ],
  expenditureMode: [
    { required: true, message: '请输入支出方式', trigger: 'blur' },
  ],
  companyId: [
    { required: true, message: '请输入支出公司', trigger: 'blur' },
  ],
  accountName: [
    { required: true, message: '请输入银行户头', trigger: 'blur' },
  ],
  amount: [
    { required: true, message: '请输入支出金额', trigger: 'blur', type: 'number' },
  ],
}

export {
  initForm,
  rules,
}
