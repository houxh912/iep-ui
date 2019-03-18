// org config options
const dictsMap = {
  isOpen: {
    0: '开',
    1: '关',
  },
  status: {
    0: '审核通过',
    1: '待审核',
    2: '审核驳回',
  },
}

const columnsMap = [
  {
    prop: '申请类型',
    label: '申请类型',
  },
  {
    prop: '部门',
    label: '部门',
  },
  {
    prop: '申请时间',
    label: '申请时间',
  },
  {
    prop: '审批人',
    label: '审批人',
  },
  {
    prop: '状态',
    label: '状态',
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
