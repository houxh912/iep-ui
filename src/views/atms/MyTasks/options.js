// org config options
const dictsMap = {
}

const columnsMap = [
  {
    prop: 'taskName',
    label: '任务名称',
  },
  {
    prop: 'taskStatus',
    label: '所属任务',
  },
  {
    prop: 'time',
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