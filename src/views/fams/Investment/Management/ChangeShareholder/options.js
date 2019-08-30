import { checkContactUser } from '@/util/rules'
const rules = {
  holdType: [
    { required: true, message: '请选择持有类型', trigger: 'blur' },
  ],
  user: [
    { required: true, validator: checkContactUser('接收人'), trigger: 'blur' },
  ],
  orgId: [
    { required: true, message: '请选择股东组织', trigger: 'blur' },
  ],
  externalShareholder: [
    { required: true, message: '请填写外部股东', trigger: 'blur' },
  ],
  investmentNumber: [
    { required: true, message: '请填写股份数量', trigger: 'blur', type: 'number', min: 1 },
  ],
  equityType: [
    { required: true, message: '请选择股本类型', trigger: 'blur' },
  ],
}
const initForm = () => {
  return {
    id: '',
    externalShareholder: '',
    user: {
      id: '',
      name: '',
    },
    orgId: '',//投资组织
    investmentNumber: 1,//股份数量
    holdType: '1',//持有类型
    equityType: '1',//股本类型
  }
}
export {
  rules,
  initForm,
}