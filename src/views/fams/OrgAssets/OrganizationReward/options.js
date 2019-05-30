// org config options
import { checkContactUser } from '@/util/rules'
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
    amount: 0, // 打赏金额
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

const rules = {
  isReward: [
    { required: true, message: '请选择打赏方式', trigger: 'blur' },
  ],
  amount: [
    { type: 'number', required: true, message: '输入的金额至少大于 0 元', trigger: 'blur', min: 1 },
  ],
  type: [
    { required: true, message: '请选择打赏类型', trigger: 'blur' },
  ],
  targetUser: [
    { required: true, message: '请选择打赏对象', validator: checkContactUser('对象'), trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, dtoForm, rules }
