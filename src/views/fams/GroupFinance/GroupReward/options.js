const dictsMap = {
  isReward: {
    1: '打赏',
    2: '扣减',
  },
}

const columnsMap = [
  {
    prop: 'orgName',
    label: '打赏对象',
  },
  {
    prop: 'amount',
    label: '金额',
  },
  {
    prop: 'createTime',
    label: '操作时间',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]

const initForm = () => {
  return {
    id: '', // ID
    amount: 0, // 打赏金额
    message: '', // 打赏备注
    type: '', // 打赏类型
    isReward: '1', // 打赏/扣减
    targetOrgId: '', // 打赏对象
  }
}

const dtoForm = (row) => {
  const newForm = { ...row }
  return newForm
}

const rules = {
  isReward: [
    { required: true, message: '请选择打赏方式', trigger: 'blur' },
  ],
  amount: [
    { type: 'number', required: true, message: '输入的金额至少大于 0 元', trigger: 'blur', min: 0.01 },
  ],
  type: [
    { required: true, message: '请选择打赏类型', trigger: 'blur' },
  ],
  targetUser: [
    { required: true, message: '请选择打赏组织', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, dtoForm, rules }
