<template>
    <div v-if="isShow" class="abs">
        <el-row class="title">
            <el-col :span="22" class="title-plain">
                新增
            </el-col>
            <el-col :span="2" class="title-bot">
                <el-button size="small" @click="close">返回</el-button>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="7">
                    <el-form :model="paramForm" :rules="rules" ref="ruleForm1">
                        <el-form-item label="项目名称" prop="name">
                            <el-input v-model="paramForm.name"  placeholder="请输入项目名称"></el-input>
                        </el-form-item>
                        <el-form-item label="相关客户:" prop="client">
                            <div>&nbsp;<!--占位符--></div>
                            <div style="overflow: hidden">
                                <div class="hidBox" style="float: left;" v-if="paramForm.client.num == 1">
                                    <div>{{ paramForm.client.names}}</div>
                                </div>
                                <div class="addBox" @click="addTag('client')">+</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="项目指导人:">
                            <div>&nbsp;<!--占位符--></div>
                            <div style="overflow: hidden">
                                <div class="hidBox" style="float: left;" v-if="paramForm.mentor.num == 1">
                                    <div>{{ paramForm.mentor.names}}</div>
                                </div>
                                <div class="addBox" @click="addTag('mentor')">+</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="承接部门:" prop="continue">
                            <div>&nbsp;<!--占位符--></div>
                            <div style="overflow: hidden">
                                <div class="hidBox" style="float: left;" v-if="paramForm.continue.num == 1">
                                    <div>{{ paramForm.continue.names}}</div>
                                </div>
                                <div class="addBox" @click="addTag('continue')">+</div>
                            </div>
                        </el-form-item>
                    </el-form>
            </el-col>
            <el-col :span="7">
                    <el-form :model="paramForm" :rules="rules" ref="ruleForm2">
                        <el-form-item label="项目类型:" prop="proType">
                            <el-select v-model="paramForm.proType" placeholder="请选择项目类型">
                                <el-option
                                        v-for="item in typeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目预算:" prop="budget">
                            <el-input v-model="paramForm.budget" placeholder="请输入项目预算(万元)"></el-input>
                        </el-form-item>
                        <el-form-item label="项目标签:" prop="proTag">
                            <div>&nbsp;<!--占位符--></div>
                            <div style="overflow: hidden">
                                <div class="hidBox" style="float: left;" v-if="paramForm.proTag.num == 1">
                                    <div>{{ paramForm.proTag.names}}</div>
                                </div>
                                <div class="addBox" @click="addTag('proTag')">+</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="合作部门:">
                            <div>&nbsp;<!--占位符--></div>
                            <div style="overflow: hidden">
                                <div class="hidBox" style="float: left;" v-if="paramForm.teamwork.num == 1">
                                    <div>{{ paramForm.teamwork.names}}</div>
                                </div>
                                <div class="addBox" @click="addTag('teamwork')">+</div>
                            </div>
                        </el-form-item>
                    </el-form>
            </el-col>
            <el-col :span="7">
                    <el-form :model="paramForm" :rules="rules" ref="ruleForm3">
                        <el-form-item label="业务类型:" prop="workType">
                            <div>&nbsp;<!--占位符--></div>
                            <div>
                                <div class="workType">
                                    <el-select @change="workTypeChange" v-model="paramForm.workType.type1" placeholder="请选择业务类型">
                                        <el-option
                                                v-for="item in workTypeOne"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="workType">
                                    <el-select v-if="!isElse" v-model="paramForm.workType.type2" placeholder="请选择业务类型">
                                        <el-option
                                                v-for="item in workTypeTwoOK"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input v-if="isElse" v-model="paramForm.noAss" placeholder="请输入业务类型"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="市场经理:" prop="manager">
                            <div>&nbsp;<!--占位符--></div>
                            <div class="hidBox" style="float: left;" v-if="paramForm.manager.num == 1">
                                <div>{{ paramForm.manager.names}}</div>
                            </div>
                            <div class="addBox" @click="addTag('manager')">+</div>
                        </el-form-item>
                        <el-form-item label="是否关联产品:" prop="isUse">
                            <el-select @change="change" v-model="paramForm.isUse" placeholder="请选择是否关联产品">
                                <el-option
                                        v-for="item in isRelevOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!--相关产品-->
                        <el-form-item label="相关产品:" prop="product" v-if="paramForm.showProduct === 1">
                            <div>&nbsp;<!--占位符--></div>
                            <div class="hidBox" style="float: left;" v-if="paramForm.product.num == 1">
                                <div>{{ paramForm.product .names}}</div>
                            </div>
                            <div class="addBox" @click="addTag('product')">+</div>
                        </el-form-item>
                        <!--为关联产品的理由-->
                        <el-form-item label="为关联产品的理由" prop="noAss" v-if="paramForm.showProduct === 2">
                            <el-input type="textarea" v-model="paramForm.noAss"></el-input>
                        </el-form-item>
                        <el-form-item label="集团外部合作伙伴:">
                            <div>&nbsp;<!--占位符--></div>
                            <div class="hidBox" style="float: left;" v-if="paramForm.sans.num == 1">
                                <div>{{ paramForm.sans.names}}</div>
                            </div>
                            <div class="addBox" @click="addTag('sans')">+</div>
                        </el-form-item>
                    </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4" :push="10">
                <iep-button type="danger" @click="save">保存</iep-button>
                <iep-button @click="close">返回</iep-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { typeOptions, isRelevOptions, workTypeOne, workTypeTwo } from './Total/const.js'
    export default {
        name: 'add-dialog',
        data (){
            let valida = (rule, value, callback) => {
                let pattrn = /^\d+(\.\d+)?$/g
                if(!pattrn.test(value)){
                    callback(new Error('仅限数字'))
                }else{
                    callback()
                }
            }
            return {
                typeOptions, //项目类型菜单
                isRelevOptions,//是否关联菜单
                workTypeOne,   //业务类型一级菜单
                workTypeTwo,   //业务类型二级菜单
                workTypeTwoOK:[], //在页面展示的业务类型二级菜单
                isElse: false,//业务类型中是不是 其他 选项
                paramForm:{
                    name:'',//项目名称
                    proType:'',//项目类型
                    showProduct:null,//是否显示 -->  相关产品
                    noAss:'',// 未关联相关产品
                    product:{
                        names : '',
                        arr:[],
                        num:0,
                    },//相关产品
                    workType:{
                        type1:'',
                        type2:'',
                    },//业务类型
                    client:{
                        names:'',
                        arr: [],
                        num:0,//0  names没客户   1 names有客户
                    },//相关客户
                    budget:null,//项目预算
                    manager:{
                        names : '',
                        arr:[],
                        num:0,
                    },//市场经理
                    mentor:{
                        names:'',
                        arr: [],
                        num:0,//0  names没有指导人   1 names有指导人
                    },//项目指导人
                    proTag:{
                        names:'',
                        arr: [],
                        num:0,
                    },//项目标签
                    isUse:null,//是否关联产品
                    continue:{
                        names:'国脉海洋信息发展有限公司',
                        arr: ['国脉海洋信息发展有限公司'],
                        num:1,
                    },//承接部门
                    teamwork:{
                        names:'',
                        arr: [],
                        num:0,
                    },//合作部门
                    sans:{
                        names:'',
                        arr: [],
                        num:0,
                    },//集团外部合作伙伴
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                    ],
                    client: [
                        { required: true},
                    ],
                    continue: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    proType: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    budget: [
                        { required: true, validator: valida, message: '仅限数字', trigger: 'blur' },
                    ],
                    proTag: [
                        { required: true },
                    ],
                    manager: [
                        { required: true },
                    ],
                    isUse: [
                        { required: true},
                    ],
                    product: [
                        { required: true},
                    ],
                    noAss: [
                        { required: true},
                    ],
                    workType: [
                        { required: true},
                    ],
                },
            }
        },
        methods:{
            close (){
                this.$emit('close',false)
            },
            //有+的点击事件
            addTag (filed){
                this.paramForm[filed].arr.push('国脉海洋')
                this.paramForm[filed].num = 1
                this.proce(filed)
            },
            change (num){
                if(num === 1){
                    //显示相关产品
                    this.paramForm.showProduct = 1
                }else{
                    this.paramForm.showProduct = 2
                }
            },
            workTypeChange (id){
                if(id === 8){
                    this.isElse = !this.isElse
                    return
                }
                this.isElse = false
                let obj = this.workTypeTwo.find((v) => {
                    return v.id === id
                })
                this.workTypeTwoOK = obj.options
            },
            save (){
                let that = this
                let num = 0
                this.$refs['ruleForm1'].validate((valid) => {
                    if (valid && that.paramForm.client.names && that.paramForm.continue.names) {
                        num += 1
                    } else {
                        console.log('第一列必填项没写完')
                        return false
                    }
                })
                this.$refs['ruleForm2'].validate((valid) => {
                    if (valid && that.paramForm.workType.type1 && that.paramForm.workType.type2 && that.paramForm.manager.names && (that.paramForm.product || that.paramForm.noAss) ) {
                        num += 1
                    } else {
                        console.log('第三列必填项没写完')
                        return false
                    }
                })
                this.$refs['ruleForm3'].validate((valid) => {
                    if (valid && that.paramForm.proTag.names) {
                        num += 1
                    } else {
                        console.log('第二列必填项没写完')
                        return false
                    }
                })
                if(num === 3){
                    alert('sumbit')
                }
            },
            proce (filed){
                this.paramForm[filed].names = this.paramForm[filed].arr.join('、')
            },
        },
        props: {
            isShow: {
                type: Boolean,
                required: false,
            },
        },
    }
</script>

<style scoped lang="scss">
    .abs{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 999;
        background: #fff;
    }
    .title{
        border-bottom:1px solid rgb(219,219,219);
        height: 49px;
        .title-plain{
            line-height: 49px;
            text-indent: 20px;
            font-weight: 900;
            font-size: 18px;
            color: #666;
        }
        .title-bot{
            margin-top: 8px;
        }
    }
    .form{
        padding-left: 20px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .addBox{
        width: 50px;
        height: 50px;
        background: rgb(239,239,239);
        text-align: center;
        line-height: 46px;
        font-weight: 900;
        color: #666;
        font-size: 35px;
        float: left;
        cursor: pointer;
    }
    .hidBox{
        height: 48px;
        margin-right: 3px;
        line-height: 48px;
        color: #666;
        padding-left: 5px;
        padding-right: 8px;
        border: 1px solid rgb(204,204,204);
    }
    .workType{
        width: 46%;
        float: left;
        margin-right: 4%;
    }
</style>