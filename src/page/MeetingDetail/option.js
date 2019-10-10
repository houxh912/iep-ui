const initForm = () => {
  return [
    {
      companyName: '', // 公司
      position: '', // 职位
      name: '', // 姓名
      phoneNumber: '', // 联系电话
      email: '', // 电子邮箱
    },
  ]
}
var checkPhone = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('手机号不能为空'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    console.log(reg.test(value))
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的手机号'))
    }
  }
}
const rules = {
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
  position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phoneNumber: [{ required: true, validator: checkPhone, trigger: 'blur' }],
  email: [{ message: '请输入电子邮箱', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
}
export { initForm, rules }