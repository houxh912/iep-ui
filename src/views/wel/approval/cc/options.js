// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '未审核',
    1: '通过',
    2: '拒绝',
  },
}

const columnsMap = [
  {
    prop: 'applyType',
    label: '申请类型',
  },
  {
    prop: 'applyStartTime',
    label: '发起时间',
  },
  {
    prop: 'applyEndTime',
    label: '审批时间',
  },
  {
    prop: 'copyPerson',
    label: '抄送人',
  },
  {
    prop: 'result',
    label: '审批结果',
  },
]

const initForm = () => {
  return {
    name: '',
    isOpen: false,
    intro: '',
  }
}

const initSearchForm = () => {
  return {
    theme: '',
    teacher: '',
    type: '',
    date: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }
