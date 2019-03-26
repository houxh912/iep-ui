const stageOptions = [
    {
        id : 1,
        label:'立项阶段',
        value: 1,
    },
    {
        id : 2,
        label:'实施阶段',
        value: 2,
    },
    {
        id : 3,
        label:'收尾阶段',
        value: 3,
    },
    {
        id : 4,
        label:'完结阶段',
        value: 4,
    },
]
const typeOptions = [
    {
        id : 1,
        label:'内部项目',
        value: 1,
    },
    {
        id : 2,
        label:'外部项目',
        value: 2,
    },
]
const bustypeOptions = [
    {
        id : 1,
        label:'咨询',
        value: 1,
    },
    {
        id : 2,
        label:'产品',
        value: 2,
    },
    {
        id : 3,
        label:'数据',
        value: 3,
    },
    {
        id : 4,
        label:'外包',
        value: 4,
    },
    {
        id : 5,
        label:'会议培训',
        value: 5,
    },
    {
        id : 6,
        label:'平台',
        value: 6,
    },
    {
        id : 7,
        label:'技术服务',
        value: 7,
    },
    {
        id : 8,
        label:'其他',
        value: 8,
    },
]
const isRelevOptions = [
    {
        id : 1,
        label:'是',
        value: 1,
    },
    {
        id : 2,
        label:'否',
        value: 2,
    },
]
const undertakeOptions = [
    {
        id : 1,
        label:'董事会',
        value: 1,
    },
    {
        id : 2,
        label:'北方区业务一部',
        value: 2,
    },
    {
        id : 3,
        label:'北方区业务二部',
        value: 3,
    },
    {
        id : 4,
        label:'北方区业务三部',
        value: 4,
    },
]
const  columnsMap = [
    {
        prop: 'budget',
        label: '项目预算',
    },
    {
        prop: 'manay',
        label: '合同金额',
    },
    {
        prop: 'stage',
        label: '项目阶段',
    },
    {
        prop: 'issue',
        label: '发布人',
    },
    {
        prop: 'issuetime',
        label: '发布时间',
    },
]
const pagedTable = [
    {
        id: 1270253,
        name:'20181212滨州市指挥交通转向规划',
        budget:'26.7',
        manay:'260000',
        stage:'立项阶段',
        issue:'杨晓凤',
        issuetime:'2019-02-22',
    },
]
const workTypeOne = [
    {
        id : 1,
        label:'咨询',
        value: 1,
    },
    {
        id : 2,
        label:'产品',
        value: 2,
    },
    {
        id : 3,
        label:'数据',
        value: 3,
    },
    {
        id : 4,
        label:'外包',
        value: 4,
    },
    {
        id : 5,
        label:'会议培训',
        value: 5,
    },
    {
        id : 6,
        label:'平台',
        value: 6,
    },
    {
        id : 7,
        label:'技术服务',
        value: 7,
    },
    {
        id : 8,
        label:'其他',
        value: 8,
    },
]
const workTypeTwo = [
    {
        id : 1,
        options:[
            {
                id : 1,
                label:'规划',
                value: 1,
            },
            {
                id : 2,
                label:'行动计划',
                value: 2,
            },
            {
                id : 3,
                label:'工作方案',
                value: 3,
            },
            {
                id : 4,
                label:'课题研究',
                value: 4,
            },
            {
                id : 5,
                label:'标准规范',
                value: 5,
            },
            {
                id : 6,
                label:'管理制度',
                value: 6,
            },
            {
                id : 7,
                label:'整体解决方案',
                value: 7,
            },
            {
                id : 8,
                label:'评测',
                value: 8,
            },
        ],
    },
    {
        id : 2,
        options:[
            {
                id : 1,
                label:'DNA',
                value: 1,
            },
            {
                id : 2,
                label:'DIPS',
                value: 2,
            },
            {
                id : 3,
                label:'咨询服务产品化',
                value: 3,
            },
        ],
    },
    {
        id : 3,
        options:[
            {
                id : 1,
                label:'数据采集',
                value: 1,
            },
            {
                id : 2,
                label:'普查',
                value: 2,
            },
            {
                id : 3,
                label:'编目',
                value: 3,
            },
            {
                id : 4,
                label:'标准化',
                value: 4,
            },
            {
                id : 5,
                label:'开放共享',
                value: 5,
            },
            {
                id : 6,
                label:'应用服务',
                value: 6,
            },
            {
                id : 7,
                label:'主题库、基础库建设',
                value: 7,
            },
            {
                id : 8,
                label:'事项材料梳理',
                value: 8,
            },
            {
                id : 9,
                label:'主题清单规范优化、再造',
                value: 9,
            },
        ],
    },
    {
        id : 4,
        options:[
            {
                id : 1,
                label:'软件',
                value: 1,
            },
            {
                id : 2,
                label:'平台',
                value: 2,
            },
            {
                id : 3,
                label:'服务',
                value: 3,
            },
        ],
    },
    {
        id : 5,
        options:[
            {
                id : 1,
                label:'研讨会',
                value: 1,
            },
            {
                id : 2,
                label:'招商合作',
                value: 2,
            },
            {
                id : 3,
                label:'培训会',
                value: 3,
            },
        ],
    },
    {
        id : 6,
        options:[
            {
                id : 1,
                label:'新建',
                value: 1,
            },
            {
                id : 2,
                label:'升级',
                value: 2,
            },
        ],
    },
    {
        id :7,
        options:[
            {
                id : 1,
                label:'网站',
                value: 1,
            },
            {
                id : 2,
                label:'平台',
                value: 2,
            },
            {
                id : 3,
                label:'软件',
                value: 3,
            },
        ],
    },
    {
        id :8,
        options:[
            {
                id : 1,
                label:'请输入',
                value: 1,
            },
        ],
    },
]
export { stageOptions, typeOptions, bustypeOptions, isRelevOptions, undertakeOptions, columnsMap, pagedTable, workTypeOne, workTypeTwo }