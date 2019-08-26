// import { mergeByFirst } from '@/util/util'
const dictsMap = {
}
const columnsMap = [
  {
    prop: 'name',
    label: '姓名',
    width: '120',
  },
  {
    prop: 'phone',
    label: '联系方式',
  },
  // {
  //   prop: 'deptName',
  //   label: '部门',
  // },
  {
    prop: 'orgName',
    label: '所属组织',
  },
  // {
  //   prop: 'gender',
  //   label: '性别',
  // },
  {
    prop: 'staffNo',
    label: '用户工号',
  },
  // {
  //   prop: 'qq',
  //   label: 'qq',
  // },
  // {
  //   prop: 'wechat',
  //   label: '微信',
  // },
  {
    prop: 'positionName',
    label: '岗位名称',
  },
  {
    prop: 'jobName',
    label: '职务名称',
  },
  // {
  //   prop: 'professionalTitle',
  //   label: '职称',
  // },
  // {
  //   prop: 'idMarks',
  //   label: '身份标识',
  // },
]

const initForm = () => {
  return {
    name:'',
    isOpen:1,
  }
}

const initGroupForm = () => {
  return {
    customId:0,
    userId:[],
  }
}

const formToDto = (row) => {
  const newForm = {...row}
  return newForm
}

const initSearchForm = () => {
  return {
    name: '',
  }
}

const rules = {
  name: [
    { required: true, message: '请输入自定义分组名', trigger: 'blur' },
  ],
}

export { dictsMap, columnsMap, initForm, initSearchForm, rules, formToDto, initGroupForm }
