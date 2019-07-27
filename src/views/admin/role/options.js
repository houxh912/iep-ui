﻿// org config options
//import { mergeByFirst } from '@/util/util'
const dictsMap = {
  dsType: {
    0: '全部',
    3: '本级',
  },
}

const dsType = [
  {
    label: '全部',
    value: 0,
    disabled: false,
  },
  {
    label: '本级',
    value: 3,
    disabled: false,
  },
]
const orgDsType = [
  {
    label: '全部',
    value: 0,
    disabled: true,
  },
  {
    label: '本级',
    value: 3,
    disabled: false,
  },
]

const columnsMap = [
  {
    prop: 'roleName',
    label: '角色名称',
  },
  {
    prop: 'roleCode',
    label: '角色标识',
  },
  {
    prop: 'roleDesc',
    label: '角色描述',
    width: '280px',
  },
  {
    prop: 'dsType',
    label: '数据权限',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '150px',
  },
]

const initForm = () => {
  return {
    roleId: '',
    dsType: 3,
    roleCode: '',
    roleDesc: '',
    roleName: '',
    isCommon: 1,
  }
}

export { dictsMap, columnsMap, initForm, dsType, orgDsType }