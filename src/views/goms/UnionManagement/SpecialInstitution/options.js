// org config options
const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

const optionMap = [{
  label: '锁定',
  value: 2,
}, {
  label: '解锁',
  value: 0,
}]

const columnsMap = [
  {
    prop: 'councilName',
    label: '真实姓名',
  },
  {
    prop: 'director',
    label: '主任',
  },
  {
    prop: 'module',
    label: '模块管理',
  },
  {
    prop: 'time',
    label: '创建时间',
  },
]

const initMemberForm = () => {
  return {
    councilName: '',
    time: '',
    orgNames: [],
    module: '',
  }
}


const initSearchForm = () => {
  return {
    name: '',
  }
}


export { dictsMap, columnsMap, optionMap, initSearchForm, initMemberForm }