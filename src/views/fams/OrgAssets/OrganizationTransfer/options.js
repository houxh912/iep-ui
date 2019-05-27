// org config options
const dictsMap = {
  isReward: {
    1: '打赏',
    2: '扣减',
  },
}

const columnsMap = [
  {
    prop: 'targetUserName',
    label: '打赏对象',
  },
  {
    prop: 'orgName',
    label: '所属组织',
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
    prop: 'message',
    label: '备注',
  },
]

const initForm = () => {
  return {
    id: '', // ID
    amount: '', // 打赏金额
    message: '', // 打赏备注
    type: '', // 打赏类型
    isReward: '', // 打赏/扣减
    targetUser: {
      id: '',
      name: '',
    }, // 打赏对象
  }
}

const dtoForm = (row) => {
  const newForm = {...row}
  newForm.targetUserId = newForm.targetUser.id
  return newForm
}

export { dictsMap, columnsMap, initForm, dtoForm }
