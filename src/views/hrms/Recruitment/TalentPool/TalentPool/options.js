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
    prop: '部门',
    label: '部门',
  },
  {
    prop: '入职时间',
    label: '入职时间',
  },
  {
    prop: '员工状态',
    label: '员工状态',
  },
  {
    prop: '岗位',
    label: '岗位',
  },
  {
    prop: '身份证号码',
    label: '身份证号码',
    minWidth: 120,
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

export { dictsMap, columnsMap, initOrgForm, initSearchForm }