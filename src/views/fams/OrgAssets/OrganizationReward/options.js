// org config options
import { checkContactUsers } from '@/util/rules'
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
    projectId: '', // 项目
    projectName: '', // 项目
    isReward: '1', // 打赏/扣减
    targetUsers: [], // 打赏对象
  }
}

const dtoForm = (row) => {
  const newForm = { ...row }
  newForm.targetUserIds = newForm.targetUsers.map(m => m.id)
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
    { required: true, message: '请选择打赏类型', trigger: 'change' },
  ],
  targetUsers: [
    { type: 'array', required: true, validator: checkContactUsers('打赏对象'), trigger: 'change' },
  ],
}

export { dictsMap, columnsMap, initForm, dtoForm, rules }
