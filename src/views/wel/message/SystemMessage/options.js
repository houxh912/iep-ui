// import { mergeByFirst } from '@/util/util'
const dictsMap = {
  messageType: {
    0: '全部',
    1: '纪要',
    2: '任务',
    3: '财富',
    4: '审批',
    5: '提醒',
    6: '其他',
    7: '星标',
  },
}
const columnsMap = [
  {
    prop: 'time',
    label: '时间',
    width: '200',
  },
]
const initSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initSearchForm }