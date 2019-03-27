const columnsMapByTypeId = [
  [
    {
      label: '业务类型',
      prop: 'businessType',
    },
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '跟进状态',
      prop: 'followUpStatusName',
    },
    {
      label: '市场经理',
      prop: 'marketManager',
    },
  ],
  [
    {
      label: '业务类型',
      prop: 'businessType',
    },
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '跟进状态',
      prop: 'followUpStatusName',
    },
    {
      label: '距离上次拜访已有',
      prop: 'lastTime',
      minWidth: '100',
    },
  ],
  [
    {
      label: '业务类型',
      prop: 'businessType',
    },
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '跟进状态',
      prop: 'followUpStatusName',
    },
    {
      label: '市场经理',
      prop: 'marketManager',
    },
    {
      label: '距离上次拜访已有',
      prop: 'lastTime',
      minWidth: '100',
    },
  ],
]
const tabList = [
  {
    label: '全部客户',
    value: '1',
  },
  {
    label: '我的客户',
    value: '2',
  },
  {
    label: '协作客户',
    value: '3',
  },
]
export { columnsMapByTypeId, tabList }
