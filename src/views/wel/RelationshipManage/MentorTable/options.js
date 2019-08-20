// import { mergeByFirst } from '@/util/util'
const dictsMap = {
}
const columnsMapMaster = [
  {
    prop: 'realName',
    label: '姓名',
    width: '120',
  },
  {
    prop: 'phone',
    label: '联系方式',
  },
  {
    prop: 'orgName',
    label: '所属组织',
  },
  {
    prop: 'staffNo',
    label: '用户工号',
  },
  {
    prop: 'confirmationTime',
    label: '拜师时间',
  },
]
const columnsMapApprentice = [
  {
    prop: 'realName',
    label: '姓名',
    width: '120',
  },
  {
    prop: 'phone',
    label: '联系方式',
  },
  {
    prop: 'orgName',
    label: '所属组织',
  },
  {
    prop: 'staffNo',
    label: '用户工号',
  },
  {
    prop: 'confirmationTime',
    label: '收徒时间',
  },
]
const columnsMapAttention = [
  {
    prop: 'name',
    label: '姓名',
    width: '120',
  },
  {
    prop: 'phone',
    label: '联系方式',
  },
  {
    prop: 'orgName',
    label: '所属组织',
  },
  {
    prop: 'staffNo',
    label: '用户工号',
  },
]

const initForm = () => {
  return {
    name:'',
  }
}

const formToDto = (row) => {
  const newForm = {...row}
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
  }
}
export { dictsMap, columnsMapMaster,columnsMapApprentice,columnsMapAttention, initForm, initSearchForm, formToDto }
