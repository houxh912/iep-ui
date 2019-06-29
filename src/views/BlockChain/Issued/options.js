import { checkContactUser } from '@/util/rules'
const initForm = () => {
  return {
    amount: 0,
  }
}
const initUserForm = () => {
  return {
    user: {
      id: '',
      name: '',
    },
  }
}

const rules = {
  amount: [
    { required: true, message: '请输入交易金额', trigger: 'blur', type: 'number' },
  ],
}
const userRules = {
  user: [
    { required: true, validator: checkContactUser('查询人'), trigger: 'blur' },
  ],
}

export {
  initForm,
  rules,
  initUserForm,
  userRules,
}
