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
        parentName:'',
        taskStatus: '',//任务状态
        priority: '',//优先级 
        executors: [],//协同人
        assistants: [],//执行人,
        principalName:'',//负责人
        avatar:'',//负责人头像
        startTime:'',//开始时间
        endTime:'',//结束时间
        sign: [],//标签
        remarks:'',//备注
        annexList: [],//附件
        attach:'',
        materials: [],//关联内容
        records:[],
    }
}
const initTransferForm = () => {
    return {
        principal:{id:'',name:''},
    }
}
const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.executorIds = form.executors.map(m=>m.id)
  newForm.assistantIds = form.assistants.map(m=>m.id)
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
export { initForm, rules, dictsMap, formToDto, initTransferForm }