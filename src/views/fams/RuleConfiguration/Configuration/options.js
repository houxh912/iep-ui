import { mergeByFirst } from '@/util/util'

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
    label: '国脉贝值',
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
    ruleName: '',
    number: '',
    score: '',
    action: '',
    dailyLimit: '',
    totalExpenditure: '',
    remarks: '',
  }
}

const initDtoForm = () => {
  return {
    isOpen: false,
    intro: '',
  }
}

const formToDto = (row) => {
  const newForm = mergeByFirst(initDtoForm(), row)
  newForm.positionId = row.position[row.position.length - 1]
  newForm.deptId = row.dept[row.dept.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
    keyword: '',
    applyTime: '',
    sendTime: '',
    sum1: '',
    sum2: '',
    type: '',
    name: '',
    status: '',
    seller: '',
  }
}

export { columnsMap, initForm, formToDto, initSearchForm }