// org config options
const dictsMap = {
}

const columnsMap = [
  {
    prop: 'name',
    label: '部门名称',
  },
  {
    prop: 'userName',
    label: '负责人',
  },
  {
    prop: 'people',
    label: '部门人数',
  },
  {
    prop: 'establishedTime',
    label: '成立时间',
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
const initmoveForm = () => {
  return {
    name: '',
    sex: '',
  }
}
const initaddForm = () => {
  return {
    superiorDepartment: '',
    departmentNumber: '',
    departmentName: '',
    departmentHead: '',
    creartedTime: '',
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
  initForm,
  initSearchForm,
  initmoveForm,
  initaddForm,
  initmergeForm,
}
