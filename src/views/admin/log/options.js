// org config options

const columnsMap = [
    {
      width: 50,
      prop: 'id',
      label: '序号',
    },
    {
      label: '标题',
      prop: 'title',
    },
    {
      label: '操作人',
      prop: 'createBy',
    },
    {
      label: 'IP地址',
      prop: 'remoteAddr',
    },
    {
      label: '请求方式',
      prop: 'method',
    },
    {
      label: '客户端',
      prop: 'serviceId',
    },
    {
      width: 80,
      label: '请求时间',
      prop: 'time',
    },
    {
      width: 150,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
]

const initMemberForm = () => {
  return {
    title: '',
    createBy: '',
    remoteAddr: '',
    method: '',
    serviceId: '',
    time: '',
    createTime:'2019-05-28 15:31',
  }
}

export { columnsMap, initMemberForm  }