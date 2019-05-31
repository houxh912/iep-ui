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
const initForm = () => {
  return{
    id:'',
    investmentOrganization:[],//投资组织
    numberOfShares:'',//股份数量
    pricePerShare:'',//每股单价
    targetAmount:'',
    predictedAnnualizedReturnRate:'',//预计年化收益率
    startDate:'',//开始日期
    endDate:'',//结束日期
    minimumSubscriptionQuantity:'',//最低认购数量
    minimumCreditScore:'',//投资人最低信用评分
  }
}
const rules = {
  investmentOrganization: [
    {type: 'array', message: '请填写投资组织', trigger: 'blur' },
  ],
  numberOfShares: [
    { required: true, type: '', message: '请填写股份数量', trigger: 'blur' },
  ],
  pricePerShare: [
    { required: true, type: '', message: '请填写每股单价', trigger: 'blur' },
  ],
  targetAmount: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
  predictedAnnualizedReturnRate: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
  startDate: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
  endDate: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
  minimumSubscriptionQuantity: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
  minimumCreditScore: [
    { required: true, type: '', message: '请填写', trigger: 'blur' },
  ],
}
export {
  rules,
  initForm,
  dictsMap,
  columnsMap,
  tabList,
}
