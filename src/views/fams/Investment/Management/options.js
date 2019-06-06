// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: { // （待审核—通过—上架—下架—结束）
    1:'待审核',
    2:'通过',
    3:'拒绝',
    4:'上架',
    5:'下架',
    6:'结束',
  },
}
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
    allSharesNumber:1,//股份数量
    sharesUnivalent:1,//每股单价
    targetAmount:1,//目标金额
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
    { required: true, message: '请填写股份数量且大于0', trigger: 'blur', type:'number', min:1 },
  ],
  sharesUnivalent: [
    { required: true, message: '请填写每股单价且大于0', trigger: 'blur', type:'number', min:1 },
  ],
  targetAmount: [
    { required: true, message: '请填写目标金额', trigger: 'blur' },
  ],
  returnRate: [
    { required: true, message: '请填写预计年化收益率', trigger: 'blur', type:'number' },
  ],
  startTime: [
    { required: true, message: '请填写开始日期', trigger: 'blur' },
  ],
  endTime: [
    { required: true, message: '请填写结束日期', trigger: 'blur' },
  ],
}
export {
  rules,
  initForm,
  dictsMap,
  columnsMap,
}
