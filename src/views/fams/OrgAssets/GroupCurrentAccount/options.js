﻿const dictsMap = {
  type: {
    'A': '收入',
    'L': '支出',
  },
}

const columnsMap = [
  {
    prop: 'serialNo',
    label: '流水号',
    minWidth: 120,
  },
  {
    prop: 'category',
    label: '往来分类',
    type: 'dictGroup',
    dictName: 'fams_current_bill_flow_type',
  },
  {
    prop: 'type',
    label: '往来类别',
    type: 'dict',
  },
  {
    prop: 'amount',
    label: '金额',
    width: 100,
  },
  {
    prop: 'createTime',
    label: '日期',
    width: 150,
  },
  {
    prop: 'remarks',
    label: '备注',
    minWidth: 200,
    type: 'detail',
  },
]

const initSearchForm = () => {
  return {
    category: '', // category
    type: '', // type
  }
}


export { columnsMap, dictsMap, initSearchForm }