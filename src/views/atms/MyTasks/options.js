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
    prop: 'name',
    label: '任务名称',
  },
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
    hasBegun:'',//是否待办
  }
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }