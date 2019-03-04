// org config options
const dictsMap = {
  employeeStatus: {
    0: '暂无',
    1: '正式员工',
    2: '试用期员工',
    3: '实习期员工',
    4: '兼职员工',
    5: '其他',
    6: '离职员工',
  },
}

const columnsMap = [
  {
    prop: 'sex',
    label: '性别',
    width: 55,
    hidden: false,
  },
  {
    prop: '部门',
    label: '部门',
    hidden: true,
  },
  {
    prop: 'employedDate',
    label: '入职时间',
    hidden: false,
  },
  {
    prop: 'employeeStatus',
    label: '员工状态',
    type: 'dict',
    hidden: false,
  },
  {
    prop: 'position',
    label: '岗位',
    hidden: false,
  },
  {
    prop: 'idCard',
    label: '身份证号码',
    minWidth: 120,
    hidden: false,
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
    organization: '',
    department: '',
    job_category: '',
    job_name: '',
    status: '',
    position: '',
    job_title: '',
    entry_time: '',
  }
}

export { dictsMap, columnsMap, initOrgForm, initSearchForm }