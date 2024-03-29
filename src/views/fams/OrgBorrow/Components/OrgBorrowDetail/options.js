import moment from 'moment'

const dictsMap = {
  borrowMoneyType: {
    '0': '国脉贝',
    '1': '线下支付',
  },
}

const statusMap = {
  '4': 2,
  '8': 5,
  '6': 5,
  '9': 5,
  '10': 5,
  '7': 5,
  '11': 3,
  '5': 4,
}

const initForm = (config) => {
  return {
    borrowObjectType: 1,//拆借类型（0 - 向集团借款，1 - 向组织借款）
    borrowMoneyType: 0,//拆借方式（0国脉贝，1线下支付）
    borrowInOrgId: '',//借入组织ID
    borrowInCompanyId: '',//借入线下公司ID
    borrowInCompanyBankId: '',//借入线下公司银行账户ID
    borrowOutOrgId: '',//借出组织ID
    borrowOutCompanyId: '',//借出线下公司ID
    borrowOutCompanyBankId: '',//借出线下公司银行账户ID
    borrowDays: 7,//几天后还款
    repaymentTime: '',//还款时间
    borrowAmount: 1,//借款金额
    groupInterest: config.groupInterest || '',//集团利息
    orgInterest: config.orgInterest || '',//组织利息
  }
}

const calculaterDate = (day) => {
  return moment().add(day, 'day').format('YYYY-MM-DD HH:mm:ss')
}

const rules = {
  borrowOutOrgId: [
    { required: true, message: '请选择借出组织', trigger: 'change' },
  ],
  borrowMoneyType: [
    { required: true, message: '请选择支付方式', trigger: 'blur' },
  ],
  borrowDays: [
    { type: 'number', required: true, message: '输入的天数 7 天或 7 天以上', trigger: 'blur', min: 7 },
  ],
  borrowInCompanyId: [
    { required: true, message: '请选择收款公司', trigger: 'change' },
  ],
  borrowAmount: [
    { type: 'number', required: true, message: '输入的金额至少大于 0 元', trigger: 'blur', min: 1 },
  ],
}

export { initForm, dictsMap, statusMap, calculaterDate, rules }
