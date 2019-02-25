// org config options
const dictsMap = {
  status: {
    0: '正常',
    1: '待审核',
    2: '锁定',
    3: '待配置',
  },
}

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
    label: '员工状态',
    type: 'dict',
  },
]

export { dictsMap, columnsMap }