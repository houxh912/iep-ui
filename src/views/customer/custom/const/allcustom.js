export const searchOption = [
  { label: '客户名称', prop: 'name' },
  { label: '区域类型', prop: 'type', type: 'select', data: [{value: 1, label: '11'}, {value: 2, label: '22'}] },
  { label: '客户关系', prop: 'guanxi', type: 'select', data: [{value: 1, label: '11'}, {value: 2, label: '22'}] },
  { label: '发布人', prop: 'faburen' },
  { label: '跟进状态', prop: 'zhuangtai', type: 'select', data: [{}, {}] },
  { label: '所属部门', prop: 'bumen', type: 'select', data: [{}, {}] },
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
    },
  ],
}
