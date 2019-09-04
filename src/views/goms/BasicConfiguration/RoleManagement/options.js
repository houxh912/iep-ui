// org config options
//import { mergeByFirst } from '@/util/util'

const columnsMap = [
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
    prop: 'creatorName',
    label: '创建者',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '150px',
  },
]

const initForm = (orgId) => {
  return {
    roleId: '',
    dsType: 3,
    roleCode: '',
    roleDesc: '',
    roleName: '',
    orgId,
  }
}

export { columnsMap, initForm }