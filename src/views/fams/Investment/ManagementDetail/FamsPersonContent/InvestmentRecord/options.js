const dictsMap = {
    paymentMethod:{
        0:'现金',
        1:'国脉贝',
    },
}

const tabList = [
  {
    label: '现金',
    value: 'cash',
  },
  {
    label: '国脉贝',
    value: 'shellfish',
  },
]

const columnsMap = [
  {
    prop: 'id',
    label: '序号',
  },
  {
    prop: 'name',
    label: '投资人',
  },
  {
    prop: 'sum',
    label: '投资金额（元）',
  },
  {
    prop: 'paymentMethod',
    label: '支付方式',
  },
  {
    prop: 'time',
    label: '投资时间',
  },
]


export { columnsMap,dictsMap,tabList }
