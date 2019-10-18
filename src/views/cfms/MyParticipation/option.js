const columns = [
  { label: '会议名称', prop: 'meetingTitle' },
  { label: '会议开始时间', prop: 'meetingTimeStart' },
  { label: '会议结束时间', prop: 'meetingTimeEnd' },
  { label: '会议地址', prop: 'address' },
]
const columnsName = [
  { label: '组织', prop: 'companyName', width: 250 },
  { label: '姓名', prop: 'name' },
  { label: '职务', prop: 'position' },
  { label: '手机', prop: 'phoneNumber' },
  { label: '邮箱', prop: 'email', width: 200 },
  { label: '备注', prop: 'note', width: 300 },
]
export { columns, columnsName }