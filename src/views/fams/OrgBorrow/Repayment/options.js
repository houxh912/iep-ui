﻿// import { mergeByFirst } from '@/util/util'
import { dictsMap } from '../options'

const tabList = [
  {
    label: '借出',
    value: 'outOrgId',
  },
  {
    label: '借入',
    value: 'inOrgId',
  },
]

const statusMap = {
  outOrgId: '10',
  inOrgId: '3',
}

const colMap = {
  'inOrgId': [
    {
      prop: 'outOrgName',
      label: '借出组织',
    },
    {
      prop: 'amount',
      label: '调拨金额',
    },
    {
      prop: 'borrowMoneyType',
      label: '支付类型',
      type: 'dict',
      width: '100',
    },
    {
      prop: 'status',
      label: '拆借状态',
      type: 'dict',
      width: '150',
    },
    {
      prop: 'repaymentTime',
      label: '还款时间',
      width: '170',
    },
  ],
  'outOrgId': [
    {
      prop: 'inOrgName',
      label: '借入组织',
    },
    {
      prop: 'amount',
      label: '调拨金额',
    },
    {
      prop: 'borrowMoneyType',
      label: '支付类型',
      type: 'dict',
      width: '100',
    },
    {
      prop: 'status',
      label: '拆借状态',
      type: 'dict',
      width: '150',
    },
    {
      prop: 'repaymentTime',
      label: '还款时间',
      width: '170',
    },
  ],
}

const initForm = () => {
  return {
    orgId: '',
  }
}
export {
  dictsMap,
  colMap,
  statusMap,
  initForm,
  tabList,
}
