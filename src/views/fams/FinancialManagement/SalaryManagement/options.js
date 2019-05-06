// import { mergeByFirst } from '@/util/util'

const dictsMap = {
  status: {
    A: '已发送',
    B: '未发送',
    C: '待发送',
    X: '回收站',
  },
}

const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'title',
    label: '标题',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'payrollTime',
    label: '工资单时间',
  },
  {
    prop: 'createTime',
    label: '上传时间',
  },
]

export { columnsMap, dictsMap }