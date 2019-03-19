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
    prop: 'leavingType',
    label: '请假类型',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'applyStartTime',
    label: '申请开始时间',
  },
  {
    prop: 'applyEndTime',
    label: '申请结束时间',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
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
