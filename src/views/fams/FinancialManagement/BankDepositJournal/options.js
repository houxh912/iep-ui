import { initNow, getYear, getMonth } from '@/util/date'

const columnsMap = [
  {
    prop: 'id',
    label: '序号',
  },
  {
    prop: 'inputTime',
    label: '录入日期',
  },
  {
    prop: 'createTime',
    label: '系统生成日期',
  },
  {
    prop: 'summary',
    label: '摘要',
  },
]

const initSearchForm = () => {
  return {
    year: new Date().getFullYear(),
    companyId: '0',
    bankId: '0',
    month: new Date().getMonth() + 1,
  }
}

export { columnsMap, initSearchForm, initNow, getYear, getMonth }