const dictsMap = {
  isContract: {
    1: '是',
    2: '否',
  },
}
const columnsMapByTypeId = [
  [
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '市场经理',
      prop: 'marketManagerName',
    },
  ],
  [
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '签订合同',
      prop: 'isContract',
      type: 'dict',
    },
  ],
  [
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
    {
      label: '市场经理',
      prop: 'marketManagerName',
    },
    {
      label: '签订合同',
      prop: 'isContract',
      type: 'dict',
    },
  ],
  [
    {
      label: '区域类型',
      prop: 'districtTypeName',
    },
    {
      label: '客户关系',
      prop: 'clientRelaName',
    },
  ],
]
const tabList = [
  {
    label: '我的客户',
    value: '2',
  },
  {
    label: '协作客户',
    value: '3',
  },
  {
    label: '全部客户',
    value: '1',
  },
  {
    label: '公海库',
    value: '4',
  },
]

export { columnsMapByTypeId, tabList, dictsMap }
