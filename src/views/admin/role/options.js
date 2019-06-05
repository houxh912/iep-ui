// org config options
//import { mergeByFirst } from '@/util/util'
const dictsMap = {
  dsType: {
    0: '全部',
    1: '自定义',
    2: '本级及子级',
    3: '本级',
  },
}

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
  },
  {
    prop: 'dsType',
    label: '数据权限',
    type: 'dict',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
]

const initMemberForm = () => {
  return {
    roleId:'',
    dsType: '',
    roleCode: '',
    roleDesc: '',
    roleName: '',
  }
}

export { dictsMap, columnsMap, initMemberForm }