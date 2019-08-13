const columnsMapByTypeId = [
  [
    { label: '客户名称', prop: 'clientName' },
    { label: '项目名称', prop: 'projectName' },
    { label: '业务类型', prop: 'businessTypeKey' },
    { label: '意向程度', prop: 'intentionLevelKey' },
    { label: '发布者', prop: 'publisher' },
    { label: '认领状态', prop: 'statusKey' },
  ],
  [
    { label: '客户名称', prop: 'clientName' },
    { label: '项目名称', prop: 'projectName' },
    { label: '业务类型', prop: 'businessTypeKey' },
    { label: '意向程度', prop: 'intentionLevelKey' },
    { label: '认领状态', prop: 'statusKey' },
  ],
  [
    { label: '客户名称', prop: 'clientName' },
    { label: '项目名称', prop: 'projectName' },
    { label: '业务类型', prop: 'businessTypeKey' },
    { label: '意向程度', prop: 'intentionLevelKey' },
    { label: '发布人', prop: 'publisher' },
  ],
]
const tabList = [
  {
    label: '全部商机',
    value: '1',
  },
  {
    label: '我发布的',
    value: '2',
  },
  {
    label: '我认领的',
    value: '3',
  },
]
export { columnsMapByTypeId, tabList }
