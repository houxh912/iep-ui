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
        taskId:'',
        taskName: '',
        parentName:'',
        taskStatus: '1',//任务状态
        priority: '',//优先级 
        executors: [],//协同人
        assistants: [],//执行人,
        principalName:'',//负责人
        avatar:'',//负责人头像
        startEndTime:[],//起止时间
        completeTime:'',//完成时间
        startTime:'',
        endTime:'',
        tagKeyWords: [],//标签
        remarks:'',//备注
        annexList: [],//附件
        attach:'',
        materials: [],//关联内容
        records:[],//流转日志
        similarTasks:[],//相似任务
        children: [],//子任务
        parentId:'',
    }
}
const initTransferForm = () => {
    return {
        principal:{id:'',name:''},
    }
}
const initConversionForm = () => {
    return {
        parent:{id:'',name:''},
    }
}

const formToDto = (form) => {
  const newForm = mergeByFirst(initForm(), form)
  newForm.executorIds = form.executors.map(m=>m.id)
  newForm.assistantIds = form.assistants.map(m=>m.id)
  return newForm
}
const rules = {
    taskName: [
        { required: true, message: '请输入任务名称', trigger: 'blur' },
    ],
    // taskStatus: [
    //     { required: true, message: '请输入', trigger: 'blur' },
    // ],
    // priority: [
    //     { required: true, message: '请输入', trigger: 'blur' },
    // ],
    // executors: [
    //     { required: true, message: '请输入', trigger: 'blur' },
    // ],
    // assistants: [
    //     { required: true, message: '请输入', trigger: 'blur' },
    // ],
    startEndTime: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    // tagKeyWords: [
    //     { required: true, message: '请输入', trigger: 'blur' },
    // ],
}
export { initForm, rules, dictsMap, formToDto, initTransferForm, initConversionForm }