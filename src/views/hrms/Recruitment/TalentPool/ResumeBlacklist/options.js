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
    prop: 'sex',
    label: '性别',
    width: 55,
  },
  {
    prop: 'education',
    label: '学历',
  },
  {
    prop: 'birthday',
    label: '出生年月',
  },
  {
    prop: 'applyPosition',
    label: '应聘岗位',
  },
  {
    prop: 'blacklistArea',
    label: '拉黑地区',
  },
  {
    prop: 'blacklistReason',
    label: '拉黑原因',
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