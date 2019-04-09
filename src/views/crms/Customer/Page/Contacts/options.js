const columnsMap = [
  { label: '联系人姓名', prop: 'contactName' },
  { label: '联系人职务', prop: 'contactPosition' },
  { label: '电话', prop: 'cellphone' },
]
const initForm = () => {
  return {
    contactName: '', //联系人姓名
    contactPosition: '', //联系人职务
    telephoneNo: '', //电话
    fax: '', //传真
    qq: '', //QQ
    wechat: '', //微信
    email: '', //邮箱
    cellphone: '', //手机
    address: '', //地址
    clientConcern: '', //客户关注
    other: '', //其他
    clientContactId: '',
    clientIds: [0],
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
    { required: true, message: '联系人姓名不能为空', trigger: 'blur' },
  ],
  contactPosition: [
    { required: true, message: '联系人职务不能为空', trigger: 'blur' },
  ],
  telephoneNo: [{ required: true, validator: phone, trigger: 'blur' }],
}
export { columnsMap, initForm, rules }
