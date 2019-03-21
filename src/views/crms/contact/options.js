const columnsMap = [
  {
    prop: 'contactName',
    label: '联系人名称',
  },
  {
    prop: 'contactPosition',
    label: '联系人职务',
  },
]

const initForm = () => {
  return {
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    clientIds: [], //对接客户
    cellphone: '', //手机
    fax: '', //传真
    qq: '', //qq
    wechat: '', //微信
    email: '', //邮箱
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
    clientInfos: [],
    clientNames: [],
    clientContactId: '',
  }
}
const initSearchForm = () => {
  return {
    contactName: '',
    clientIds: [],
  }
}
const phone = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('手机号不可为空'))
  } else {
    if (value !== '') {
      var reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      }
    }
    callback()
  }
}
const rules = {
  contactName: [
    { required: true, message: '请输入联系人姓名', trigger: 'blur' },
  ],
  contactPosition: [
    { required: true, message: '请输入联系人职务', trigger: 'blur' },
  ],
  telephoneNo: [
    {
      required: true,
      validator: phone,
      trigger: 'blur',
    },
  ],
  clientConcern: [
    { required: true, message: '请输入客户关注', trigger: 'blur' },
  ],
  cellphone: [{ required: true, message: '请填写电话', trigger: 'blur' }],
  fax: [{ required: true, message: '请填写传真', trigger: 'blur' }],
  qq: [{ required: true, message: '请填写组织QQ', trigger: 'blur' }],
  wechat: [{ required: true, message: '请填写微信', trigger: 'blur' }],
  email: [
    { required: true, message: '请填写邮箱', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change'],
    },
  ],
  address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
  clientId: [{ required: true, message: '请选择对应客户', trigger: 'blur' }],
}
export { columnsMap, initForm, rules, initSearchForm }
