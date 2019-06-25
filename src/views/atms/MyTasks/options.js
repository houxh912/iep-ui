// org config options
const dictsMap = {
  status: {
    1: '进行中',
    2: '已完成',
    3: '已确认',
  },
}

const columnsMap = [
  {
    prop: 'parentName',
    label: '所属任务',
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