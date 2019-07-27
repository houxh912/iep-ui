// org config options
const dictsMap = {
  status: {
    0: '技术文档',
    1: '产品与解决方案',
    2: '培训/课程',
  },
}

const columnsMap = [
  {
    prop: 'name',
    label: '名称',
  },
  {
    prop: 'status',
    label: '类型',
    type: 'dict',
    width:'100',
  },
  {
    prop: 'time',
    label: '更新时间',
    width:'120',
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