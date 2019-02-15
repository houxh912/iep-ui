export const searchOption = [
  { label: '客户名称', prop: 'name' },
  { label: '区域类型', prop: 'type', type: 'select', data: [{value: 1, label: '11'}, {value: 2, label: '22'}] },
  { label: '客户关系', prop: 'guanxi', type: 'select', data: [{value: 1, label: '11'}, {value: 2, label: '22'}] },
  { label: '跟进状态', prop: 'zhuangtai', type: 'select', data: [{}, {}] },
]

export const mainTableOption = {
  selection: false,
  border:true,
  menu: false,
  header: false,
  column: [
    {
      label: '客户名称',
      prop: 'name',
    }, {
      label: '业务类型',
      prop: 'type',
    }, {
      label: '客户类型',
      prop: 'type',
    },  {
      label: '客户关系',
      prop: 'guanxi',
    }, {
      label: '跟进状态',
      prop: 'zhuangtai',
    }, {
      label: '市场经理',
      prop: 'jingli',
    }, {
      label: '操作',
      prop: 'menu',
      solt: true,
      align: 'center',
    },
  ],
}

export const mainFormOption = {
  labelWidth: '155',
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
      dicData: [],
    },
    {
      label: '事项名称',
      prop: 'matName',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 100,
    },
    {
      label: '事项编码',
      prop: 'matCode',
      span: 24,
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 50,
    },
    {
      label: '事项类别',
      prop: 'types',
      span: 24,
      type: 'cascader',
      rules: [{ required: true, message: '不能为空', trigger: 'change' }],
      dicData: [],
    },
    {
      label: '申请理由',
      prop: 'applyReason',
      span: 24,
      type: 'textarea',
      rules: [{ required: true, message: '不能为空', trigger: 'blur' }],
      maxlength: 2000,
    },
  ],
}
