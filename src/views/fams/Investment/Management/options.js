// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: { // （待核准—通过—上架—下架—结束）
    1: '待核准',
    2: '通过',
    3: '拒绝',
    4: '上架',
    5: '下架',
    6: '结束',
  },
}
const columnsMap = [
  {
    prop: 'allSharesNumber',
    label: '总股本',
  },
  {
    prop: 'targetAmount',
    label: '目标金额',
  },
  {
    prop: 'hadMoney',
    label: '已投金额',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
]
const initForm = () => {
  return {
    id: '',
    orgId: '',//投资组织
    allSharesNumber: 1,//股份数量
    sharesUnivalent: 1,//每股单价
    holdType: '1',//持有类型
    equityType: '1',//股本类型
  }
}
const rules = {
  orgId: [
    { required: true, message: '请填写投资组织', trigger: 'blur' },
  ],
  allSharesNumber: [
    { required: true, message: '请填写股份数量且大于0', trigger: 'blur', type: 'number', min: 1 },
  ],
  sharesUnivalent: [
    { required: true, message: '请填写每股单价且大于0', trigger: 'blur', type: 'number', min: 1 },
  ],
}
export {
  rules,
  initForm,
  dictsMap,
  columnsMap,
}
