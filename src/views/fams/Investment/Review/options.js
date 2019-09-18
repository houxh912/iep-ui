// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: { // （1待发布,2审核中,3已发布）
    1: '待发布',
    2: '审核中',
    3: '已发布',
  },
}
const columnsMap = [
  {
    prop: 'allSharesNumber',
    label: '总股本',
  },
  {
    prop: 'sharesUnivalent',
    label: '今日股价',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]
export {
  dictsMap,
  columnsMap,
}
