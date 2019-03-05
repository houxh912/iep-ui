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
    prop: '岗位分类',
    label: '岗位分类',
  },
  {
    prop: '岗位名称',
    label: '岗位名称',
  },
  {
    prop: '在职人数',
    label: '在职人数',
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
