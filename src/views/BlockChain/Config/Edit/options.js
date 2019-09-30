// import { mergeByFirst } from '@/util/util'

const columnsMap = [
  {
    prop: 'ruleName',
    label: '规则名称',
  },
  {
    prop: 'number',
    label: '规则编码',
  },
  {
    prop: 'action',
    label: '动作',
    type: 'dictGroup',
    dictName: 'fams_wealth_action',
  },
  {
    prop: 'score',
    label: '能贝数值',
  },
  {
    prop: 'dailyLimit',
    label: '每日上限次数',
  },
  {
    prop: 'totalExpenditure',
    label: '累计支出',
  },
  {
    prop: 'remarks',
    label: '描述',
  },
]

const initForm = () => {
  return {
    ruleId: '',
    orgId: '',
    creatorId: '',
    createTime: '',
    type: '',
    ruleName: '',
    number: '',
    score: '',
    action: '',
    dailyLimit: '',
    totalExpenditure: '',
    remarks: '',
  }
}

const rules = {
  score: [
    { required: true, message: '请填写国脉贝数量', trigger: 'blur', type: 'number' },
  ],
  dailyLimit: [
    { required: true, message: '请填写每日上限次数', trigger: 'blur', type: 'number' },
  ],
  action: [
    { required: true, message: '请填写动作', trigger: 'blur' },
  ],
  remarks: [
    { required: true, message: '请填写描述', trigger: 'blur' },
  ],
}

export { columnsMap, initForm, rules }
