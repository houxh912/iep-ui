import { mergeByFirst } from '@/util/util'
import { initNow } from '@/util/date'
const dictsMap = {
}

const columnsMap = [
  {
    prop: 'name',
    label: '部门名称',
  },
  {
    prop: 'userName',
    label: '负责人',
  },
  {
    prop: 'people',
    label: '部门人数',
  },
  {
    prop: 'establishedTime',
    label: '成立时间',
  },
]

const initForm = () => {
  return {
    id: '',
    name: '',
    number: '',
    userId: '',
    userName: '',
    parentId: 0,
    parentName: '无',
    establishedTime: initNow(),
    user: {
      id: '',
      name: '',
    },
  }
}

const toDeptForm = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.user.id = newForm.userId
  newForm.user.name = newForm.userName
  return newForm
}

const toNewParentForm = (row) => {
  return mergeByFirst(initForm(), {
    parentId: row.id || 0,
    parentName: row.name || '无',
  })
}

const toDtoForm = (row) => {
  const newForm = mergeByFirst(initForm(), row)
  newForm.userId = newForm.user.id
  newForm.userName = newForm.user.name
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
    sex: '',
  }
}
const initmoveForm = () => {
  return {
    name: '',
    sex: '',
  }
}
const initaddForm = () => {
  return {
    superiorDepartment: '',
    departmentNumber: '',
    departmentName: '',
    departmentHead: '',
    creartedTime: '',
  }
}
const initmergeForm = () => {
  return {
    name: '',
    sex: '',
  }
}
export {
  dictsMap,
  columnsMap,
  initForm,
  initSearchForm,
  initmoveForm,
  initaddForm,
  initmergeForm,
  toDeptForm,
  toNewParentForm,
  toDtoForm,
}
