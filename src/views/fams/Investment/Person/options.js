// import { mergeByFirst } from '@/util/util'

const dictsMap = {
    status:{
        0:'待审核',
        1:'通过',
        2:'拒绝',
    },
}
const columnsMap = [
  {
    prop:'name',
    label:'投资人',
  },
  {
    prop:'organization',
    label:'投资组织',
  },
  {
    prop:'way',
    label:'支付方式',
  },
  {
    prop:'amount',
    label:'投资金额',
  },
  {
    prop:'sharesNumber',
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
