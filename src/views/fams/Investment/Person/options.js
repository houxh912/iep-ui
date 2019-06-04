// import { mergeByFirst } from '@/util/util'

const dictsMap = {
    status:{
        1:'待审核',
        2:'通过',
        3:'拒绝',
    },
}
const columnsMap = [
  {
    prop:'totalAmount',
    label:'投资金额',
  },
  {
    prop:'investmentNumber',
    label:'投资股数',
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
}
