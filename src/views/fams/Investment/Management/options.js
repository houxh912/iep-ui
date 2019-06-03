// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: { // （1待审核，2进行中，3已结束）
    1:'待审核',
    2:'进行中',
    3:'已结束',
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
    prop:'investmentNumber',
    label:'已投人数',
  },
  {
    prop:'targetAmount',
    label:'目标金额',
  },
  {
    prop:'hadMoney',
    label:'已投金额',
  },
  {
    prop:'status',
    label:'状态',
    type:'dict',
  },
]
const initForm = () => {
  return{
    id:'',
    orgId:'',//投资组织
    allSharesNumber:0,//股份数量
    sharesUnivalent:0,//每股单价
    targetAmount:0,//目标金额
    returnRate:0,//预计年化收益率
    startTime:'',//开始日期
    endTime:'',//结束日期
    minimumBuy:0,//最低认购数量
    minimumCredit:0,//投资人最低信用评分
  }
}
const rules = {
  orgId: [
    { required: true, message: '请填写投资组织', trigger: 'blur' },
  ],
  allSharesNumber: [
    { required: true, message: '请填写股份数量', trigger: 'blur' },
  ],
  sharesUnivalent: [
    { required: true, message: '请填写每股单价', trigger: 'blur' },
  ],
  targetAmount: [
    { required: true, message: '请填写目标金额', trigger: 'blur' },
  ],
  returnRate: [
    { required: true, message: '请填写预计年化收益率', trigger: 'blur' },
  ],
  startTime: [
    { required: true, message: '请填写开始日期', trigger: 'blur' },
  ],
  endTime: [
    { required: true, message: '请填写结束日期', trigger: 'blur' },
  ],
  minimumBuy: [
    { required: true, message: '请填写最低认购数量', trigger: 'blur' },
  ],
  minimumCredit: [
    { required: true, message: '请填写投资人最低信用评分', trigger: 'blur' },
  ],
}
export {
  rules,
  initForm,
  dictsMap,
  columnsMap,
  tabList,
}
