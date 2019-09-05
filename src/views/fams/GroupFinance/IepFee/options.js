// org config options
import { initNow } from '@/util/date'

const columnsMap = [
  {
    prop: 'numberOfPayments',
    label: '人数',
  },
  {
    prop: 'amount',
    label: '金额',
  },
  {
    prop: 'userName',
    label: '操作人',
  },
  {
    prop: 'createTime',
    label: '操作时间',
  },
  {
    prop: 'remarks',
    label: '备注',
    type: 'detail',
  },
]

const initForm = () => {
  return {
    id: '', // ID
    remarks: '', // 备注
    dateOfCollection: initNow(), // 时间
  }
}

const dtoForm = (row) => {
  const newForm = { ...row }
  return newForm
}

const rules = {
  remarks: [
    { required: true, message: '请输入备注', trigger: 'blur' },
  ],
  dateOfCollection: [
    { required: true, message: '请输入时间', trigger: 'blur' },
  ],
}

export { columnsMap, initForm, dtoForm, rules }
