// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '转正',
    1: '提现',
    2: '实习',
  },
}

const columnsMap = [
  {
    prop: 'type',
    label: '申请类型',
    type: 'dict',
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
    name: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }