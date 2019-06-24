// org config options
const dictsMap = {
  taskStatus: {
    0: '待办',
    1: '进行中',
    2: '已完成',
    3: '已逾期',
  },
}

const columnsMap = [
  {
    prop: 'parentName',
    label: '所属任务',
  },
  {
    prop: 'startTime',
    label: '起止时间',
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