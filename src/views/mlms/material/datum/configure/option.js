export const dictsMap = {
  type: {
    1: '类型1',
    2: '类型2',
  },
}

export const tableOption = {
  props: [
    { label: '分类名称', prop: 'name' },
    { label: '移动', prop: 'more', slot: true, align: 'center' },
    { label: '状态', prop: 'status', slot: true },
    { label: '创建时间', prop: 'date', slot: true },
    { label: '操作', prop: 'menu', slot: true },
  ],
}

export const initFormData = () => {
  return {
    id: '',
    name: '',
  }
}

export const rules = {
  name: [
    { required: true, message: '请输入组织名称', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
}
