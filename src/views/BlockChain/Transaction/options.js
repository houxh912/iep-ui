import { checkContactUser } from '@/util/rules'
const initForm = () => {
  return {
    user: {
      id: '',
      name: '',
    },
    amount: 0,
  }
}

const toDtoFrom = (row) => {
  const newForm = { ...row }
  newForm.userId = newForm.user.id
  delete newForm.user
  return newForm
}

const rules = {
  user: [
    { required: true, validator: checkContactUser('接收人'), trigger: 'blur' },
  ],
  amount: [
    { required: true, message: '请输入交易金额', trigger: 'blur', type: 'number' },
  ],
}

export {
  initForm,
  rules,
  toDtoFrom,
}
