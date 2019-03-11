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
    prop: 'type',
    label: 'type',
  },
  {
    prop: 'name',
    label: 'name',
  },
  {
    prop: 'count',
    label: 'count',
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
const initeditForm = () => {
  return {
    positionName: '111',
    positionType: '',
    positionTask: '',
    positionRequire: '',

  }
}
export { dictsMap, columnsMap, initOrgForm, initSearchForm, initeditForm }
