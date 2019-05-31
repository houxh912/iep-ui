// import { mergeByFirst } from '@/util/util'

const dictsMap = {
    status:{
        0:'待审核',
        1:'通过',
        2:'拒绝',
    },
}
const tabList = [
  {
    label: '待审核',
    value: '1',
  },
  {
    label: '通过',
    value: '2',
  },
  {
    label: '拒绝',
    value: '3',
  },
]
const columnsMap = [
  {
    prop:'amount',
    label:'目标金额',
  },
  {
    prop:'interestRate',
    label:'预计年利率',
  },
  {
    prop:'way',
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
