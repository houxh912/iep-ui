// import { mergeByFirst } from '@/util/util'
const dictsMap = {
}
const columnsMap = [
  {
    prop: 'name',
    label: '姓名',
    width: '200',
  },
  {
    prop: 'contact',
    label: '联系方式',
  },
  {
    prop: 'department',
    label: '部门',
  },
  {
    prop: 'org',
    label: '所属组织',
  },
]

const initForm = () => {
  return {
  }
}

const initSearchForm = () => {
  return {
    name: '',
  }
}

export { dictsMap, columnsMap, initForm, initSearchForm }