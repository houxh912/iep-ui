import { mergeByFirst } from '@/util/util'
const dictsMap = {
  taskStatus: {
    1: '未完成',
    2: '已完成',
    3: '已确认',
  },
  priority: {
    1: '普通',
    2: '紧急',
    3: '非常紧急',
  },
}
const initForm = () => {
    return {
        taskName: '',
        ownTask:[],
        taskStatus: '',//任务状态
        priority: '',//优先级 
        synergist: {//协同人
            orgs: [],
            users: [],
            unions: [],
            img:'',
        },
        executor: {//执行人
            orgs: [],
            users: [],
            unions: [],
            img:'',
        },
        implementRangeTime:'',//起止时间
        sign: [],//标签
        remarks:'',//备注
        enclosure: [],//附件
        links: '',//关联内容
    }
}
const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.assistantIds = form.synergist.users.map(m=>m.id)
  newForm.executorIds = form.executor.users.map(m=>m.id)
  return newForm
}
const rules = {
    tasktName: [
        { required: true, message: '请输入任务名称', trigger: 'blur' },
    ],
    ownTask: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    priority: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    synergist: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    executor: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    implementRangeTime: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    sign: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    enclosure: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    links: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
}
export { initForm, rules, dictsMap, formToDto }