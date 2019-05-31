// import { mergeByFirst } from '@/util/util'

const dictsMap = {
    status:{
        0:'未开始',
        1:'进行中',
        2:'已完结',
    },
}
const tabList = [
  {
    label: '未开始',
    value: 'notBegin',
  },
  {
    label: '进行中',
    value: 'inHand',
  },
  {
    label: '已完结',
    value: 'hasEnd',
  },
]
const columnsMap = [
  {
    prop:'member',
    label:'已投人数',
  },
  {
    prop:'targetAmount',
    label:'目标金额',
  },
  {
    prop:'votedAmount',
    label:'已投金额',
  },
  {
    prop:'investmentMode',
    label:'投资方式',
  },
  {
    prop:'status',
    label:'状态',
    type:'dict',
  },
]
export {
  dictsMap,
  columnsMap,
  tabList,
}
