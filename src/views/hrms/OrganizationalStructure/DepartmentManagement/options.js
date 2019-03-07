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
    prop: '部门名称',
    label: '部门名称',
  },
  {
    prop: '负责人',
    label: '负责人',
  },
  {
    prop: '部门人数',
    label: '部门人数',
  },
  {
    prop: '成立时间',
    label: '成立时间',
  },
]

const initOrgForm = () => {
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
const initmoveForm = () => {
  return {
    name: '',
    sex: '',
  }
}
const initaddForm = () => {
  return {
    superiorDepartment:'',
    departmentNumber:'',
    departmentName:'',
    departmentHead:'',
    creartedTime:'',
  }
}
const initmergeForm = () => {
  return {
    name: '',
    sex: '',
  }
}
export {
  dictsMap,
  columnsMap,
  initOrgForm,
  initSearchForm,
  initmoveForm,
  initaddForm,
  initmergeForm,
}
