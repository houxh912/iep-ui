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
    prop: '性别',
    label: '性别',
    width: 55,
  },
  {
    prop: '学历',
    label: '学历',
  },
  {
    prop: '应聘岗位',
    label: '应聘岗位',
  },
  {
    prop: '简历接受时间',
    label: '简历接受时间',
  },
  {
    prop: '来源',
    label: '来源',
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
const initrejectedForm = () => {
  return {
    msg:'',
    
  }
}
export { dictsMap, columnsMap, initForm, initSearchForm,initrejectedForm }