// import { mergeByFirst } from '@/util/util'

const initForm = () => {
  return {
    parentId: '',
    parentName: '',
    orgId: '',
    name: '',
    taxpayerNumber: '', // 纳税人识别号
    phone: '', // 电话
    address: '', // 地址
    businessScope: '', // 经营范围
    bankAccountIds: [], // 关联的银行
    wagePayAccountId: 1, // 关联工资支付银行
    invoiceAccountIds: [], // 关联开票银行
  }
}

const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
  },
  {
    prop: 'name',
    label: '公司名称',
  },
  {
    prop: 'orgName',
    label: '关联组织',
  },
  {
    prop: 'updateTime',
    label: '操作时间',
  },
]

const rules = {
  name: [
    { required: true, message: '请输入线下公司名称', trigger: 'blur' },
  ],
  orgId: [
    { required: true, message: '请选择户头所属组织', trigger: 'change' },
  ],
  bankAccountIds: [
    { required: false, message: '请选择关联银行账户', trigger: 'change' },
  ],
  taxpayerNumber: [
    { required: false, message: '请输入纳税人识别号', trigger: 'blur' },
  ],
  phone: [
    { required: false, message: '请输入电话', trigger: 'blur' },
  ],
  address: [
    { required: false, message: '请输入地址', trigger: 'blur' },
  ],
  businessScope: [
    { required: false, message: '请输入经营范围', trigger: 'blur' },
  ],
}
export {
  columnsMap,
  initForm,
  rules,
}
