import { mergeByFirst } from '@/util/util'

const columnsMap = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'amount',
    label: '提现金额',
  },
  {
    prop: 'deductionInvoice',
    label: '发票抵扣金额',
  },
  {
    prop: 'amount',
    label: '金额',
  },
  {
    prop: 'currentAmount',
    label: '当前金额',
  },{
    prop: 'time',
    label: '日期',
  },{
    prop: 'remarks',
    label: '备注',
  },
]

const initForm = () => {
  return {
    'id': '',
    'name': '',
  }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.positionId = form.position[form.position.length - 1]
  return newForm
}

const initSearchForm = () => {
  return {
  }
}

export { columnsMap, initForm, initSearchForm, formToDto }