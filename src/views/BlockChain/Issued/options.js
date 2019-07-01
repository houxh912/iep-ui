import { checkContactUser } from '@/util/rules'
const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
    width: '55',
  },
  {
    prop: 'sender',
    label: '发送者',
  },
  {
    prop: 'receiver',
    label: '接收者',
  },
  {
    prop: 'hash',
    label: '哈希值',
  },
  {
    prop: 'amount',
    label: '金额',
    width: '80',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initForm = () => {
  return {
    amount: 0,
    user: {
      id: '',
      name: '',
    },
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

const toDtoFrom = (row) => {
  const newForm = { ...row }
  newForm.userId = newForm.user.id
  delete newForm.user
  return newForm
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
  columnsMap,
  initForm,
  rules,
  initUserForm,
  userRules,
  toDtoFrom,
}
