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
    prop: 'realName',
    label: '真实姓名',
  },
  {
    prop: 'phone',
    label: '手机',
  },
  {
    prop: 'assetOrg',
    label: '资产所属',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
    width: '150px',
  },
]

const initForm = () => {
  return {
    userId: '',
    username: '',
    realName: '',
    roleList: [],
    phone: '',
    orgNames: [],
    assetOrgId: '',
    avatar: '',
    message: '',
  }
}


const initSearchForm = () => {
  return {
    name: '',
  }
}


export { dictsMap, columnsMap, optionMap, initSearchForm, initForm }