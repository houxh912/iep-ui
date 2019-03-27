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
export { columnsMap, initForm }
