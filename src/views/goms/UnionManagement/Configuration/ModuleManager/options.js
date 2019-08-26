import { mergeByFirst } from '@/util/util'
const dictsMap = {
  status: {
    0: '正常',
    1: '锁定',
  },
}
const columnsMap = [
  {
    prop: 'name',
    label: '模块名称',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'userName',
    label: '创建者',
  },
  {
    prop: 'memberNum',
    label: '成员数量',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initForm = () => {
  return {
    moduleId: '',
    userId: '',
    user: {
      id: '',
      name: '',
    },
    status: '',
  }
}

const toDtoForm = (row) => {
  const newForm = { ...row }
  newForm.userId = newForm.user.id
  return newForm
}

const toVoForm = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.user = {
    id: row.userId,
    name: row.userName,
  }
  return newForm
}

export { columnsMap, initForm, toDtoForm, dictsMap, toVoForm }