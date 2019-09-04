// org config options
const dictsMap = {
  status: {
    1: '未完成',
    2: '已完成',
    3: '已确认',
  },
  isOverDue: {
    0: '未逾期',
    1: '已逾期',
  },
}

const columnsMap = [
  {
    prop: 'name',
    label: '任务名称',
    width:'250',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'isOverDue',
    label: '是否逾期',
    type: 'dict',
  },
  {
    prop: 'creatorName',
    label: '创建人',
  },
  {
    prop: 'principalName',
    label: '负责人',
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
    sex: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }