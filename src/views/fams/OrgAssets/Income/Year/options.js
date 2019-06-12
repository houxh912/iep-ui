import { initNow, getYear, getMonth } from '@/util/date'

const columnsMap = [
  {
    prop: 'id',
    label: '编号',
  },
  {
    prop: 'typeName',
    label: '类别',
  },
]

const initSearchForm = () => {
  return {
    year: new Date().getFullYear(),
    companyId: '0',
    bankId: '0',
    month: new Date().getMonth()+1,
  }
}

export { columnsMap, initSearchForm, initNow, getYear, getMonth }