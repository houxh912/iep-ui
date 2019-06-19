const initForm = () => {
    return {
        tasktName: '',
        ownTask:[],
        status: '',
        priority: '',
        synergist: '',
        executor:'',
        implementRangeTime:'',
        sign: '',
        remarks:'',
        subtasks: '',
        enclosure: '',
        links: '',
    }
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
    subtasks: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    enclosure: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
    links: [
        { required: true, message: '请输入', trigger: 'blur' },
    ],
}
export { initForm, rules }