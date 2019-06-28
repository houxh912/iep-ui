// import { checkContactUser } from '@/util/rules'
const initForm = () => {
  return {
    amount: 0,
  }
}

const rules = {
  amount: [
    { required: true, message: '请输入交易金额', trigger: 'blur', type: 'number' },
  ],
}

export {
  initForm,
  rules,
}
