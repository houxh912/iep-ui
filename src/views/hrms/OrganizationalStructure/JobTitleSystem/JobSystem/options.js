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
    prop: '职务名称',
    label: '职务名称',
    width: 280,
  },
  {
    prop: '职务说明',
    label: '职务说明',
  },
  {
    prop: '优先级',
    label: '优先级',
    width: 280,
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
