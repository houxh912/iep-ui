const columnsMap = [
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
    clientContactId: '',
  }
}
const initSearchForm = () => {
  return {
    contactName: '',
    clientName: '',
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
  address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
}
export { columnsMap, initForm, rules, initSearchForm }
