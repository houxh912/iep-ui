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
    prop: '招聘部门',
    label: '招聘部门',
  },
  {
    prop: '招聘人数',
    label: '招聘人数',
  },
  {
    prop: '工作类型',
    label: '工作类型',
  },
  {
    prop: '招聘申请时间',
    label: '招聘申请时间',
  },
  {
    prop: '招聘状态',
    label: '招聘状态',
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
    keyword: '',
    department: '',
    category: '',
    name: '',
    sex: '',
    status: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }