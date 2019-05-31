
const dictsMap = {
  investmentMoneyType: {
    '0': '国脉贝',
    '1': '现金',
  },
}

const statusMap = {
  '4': 2,
  '8': 5,
  '6': 5,
  '10': 5,
  '7': 5,
  '11': 3,
  '5': 4,
}

const initForm = () => {
  return {
    sharesNumber: '', //股份数量
    investmentAmount: '',//投资金额
    investmentMoneyType: '0',//支付方式（0国脉贝，1现金）
    investmentCompanyId: '',//投资组织
  }
}

const rules = {
  sharesNumber: [
    { type:'number', required: true, message: '输入的数量至少大于 0 ', trigger: 'blur', min: 1 },
  ],
  investmentAmount: [
    { type:'number', required: true, message: '输入的金额至少大于 0 元', trigger: 'blur', min: 1 },
  ],
  investmentMoneyType: [
    { required: true, message: '请选择支付方式', trigger: 'blur' },
  ],
  investmentCompanyId: [
    { required: true, message: '请选择投资组织', trigger: 'blur' },
  ],
}

export { initForm, dictsMap, statusMap, rules }