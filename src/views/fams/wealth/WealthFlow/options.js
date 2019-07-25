import { mergeByFirst } from '@/util/util'
const dictsMap = {
  type: {
    'L': '支出',
    'A': '收入',
  },
}
const columnsMap = [
  {
    prop: 'name',
    label: '流水号',
    minWidth: '200',
  },
  {
    prop: 'type',
    label: '分类',
    type: 'dict',
  },
  {
    prop: 'amount',
    label: '金额',
  },
  {
    prop: 'currentAmount',
    label: '当前金额',
  },
  {
    prop: 'createTime',
    label: '日期',
    width: '170',
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: '400',
  },
]

const initSearchForm = () => {
  return {
    serialNo: null, // 流水
    rangeTime: null, // 日期
  }
}
const initDtoSearchForm = () => {
  return {
    serialNo: '', // 流水
    startTime: null, // 日期
    endTime: null, // 日期
  }
}
const toDtoSearchForm = (row) => {
  const newForm = mergeByFirst(initDtoSearchForm(), row)
  if (row.rangeTime) {
    newForm.startTime = row.rangeTime[0]
    newForm.endTime = row.rangeTime[1]
  }
  return newForm
}
export { columnsMap, initSearchForm, initDtoSearchForm, toDtoSearchForm, dictsMap }