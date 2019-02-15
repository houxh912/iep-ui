export const mainTableOption = {
  selection: false,
  border:true,
  menu: false,
  header: false,
  column: [
    {
      label: '名称',
      prop: 'name',
    },
    {
      label: '操作',
      prop: 'menu',
      solt: true,
    },
  ],
}

export const searchOption = [
  { label: '名称', prop: 'name', type: 'input' },
  { label: '选项', prop: 'type', type: 'select', data: [{value: 1, label: '选项1'}, {value: 2, label: '选项2'}] },
]

export const formOption = {
  labelWidth: '150',
  menuBtn: false,
  selection: false,
  menu: false,
  header: false,
  border:true,
  column: [
    {
      label: '需求部门',
      prop: 'deptId',
      span: 24,
      type: 'select',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: [{value: 1, label: '部门1'}],
    },
  ],
}
