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
  // operate: {

  // }
}

const columnsMap = [
  {
    prop: 'applyType',
    label: '申请类型',
  },
  {
    prop: 'startTime',
    label: '开始时间',
  },
  {
    prop: 'markingTime',
    label: '批阅时间',
  },
  {
    prop: 'approver',
    label: '审批人',
  },
  {
    prop: 'approveRes',
    label: '审批结果',
  },
  // {
  //   prop: 'status',
  //   label: '状态',
  // },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    typeId: '',
    duties: '',
  }
}
const initEditForm = () => {
  return {
    id: '',
    name: '',
    applyType: '',
    startTime: '',
    markingTime: '',
    approver: '',
    approveRes: '',
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

export { dictsMap, columnsMap, initForm, initEditForm, initSearchForm }
