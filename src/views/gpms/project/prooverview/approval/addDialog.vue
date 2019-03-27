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

        <el-form :model="paramForm" :rules="rules" ref="ruleForm">

            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="7">
                    <el-form-item label="项目经理" prop="names">
                        <div>&nbsp;<!--占位符--></div>
                        <div style="overflow: hidden">
                            <div class="hidBox" style="float: left;" v-if="paramForm.names.num == 1">
                                <div>{{ paramForm.names.names}}</div>
                            </div>
                            <div class="addBox" @click="addTag('names')">+</div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="paramForm.sex" placeholder="请选择项目经理性别">
                            <el-option
                                    v-for="item in paramForm.sexOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="年龄">
                        <el-input v-model="paramForm.age"  placeholder="请输入项目经理年龄"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="7">
                    <el-form-item label="身份证号码">
                        <el-input v-model="paramForm.idCard"  placeholder="请输入项目经理身份证号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="联系电话" prop="iphone">
                        <el-input v-model="paramForm.iphone"  placeholder="请输入项目经理联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="邮编">
                        <el-input v-model="paramForm.postcode"  placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="23">
                    <el-form-item label="通讯地址">
                        <el-input v-model="paramForm.aside"  placeholder="请输入通讯地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="7">
                    <el-form-item label="任命开始日期" prop="openDate">
                        <el-date-picker
                                type="date"
                                placeholder="请选择任命结束日期"
                                value-format="yyyy-MM-dd"
                                v-model="paramForm.openDate"
                                style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="任命结束日期" prop="endDate">
                        <el-date-picker
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="请选择任命结束日期"
                                v-model="paramForm.endDate"
                                style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="授权单位" prop="accredit">
                        <div>&nbsp;<!--占位符--></div>
                        <div style="overflow: hidden">
                            <div class="hidBox" style="float: left;" v-if="paramForm.accredit.num == 1">
                                <div>{{ paramForm.accredit.names}}</div>
                            </div>
                            <div class="addBox" @click="addTag('accredit')">+</div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row class="row-bg last">
                <el-col :span="7">
                    <el-form-item label="授权日期" prop="accreditDate">
                        <el-input v-model="paramForm.accreditDate"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>


        <el-row>
            <el-col :span="4" :push="10">
                <iep-button type="danger" @click="save">保存</iep-button>
                <iep-button @click="close">返回</iep-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'add-dialog',
        data (){
            let valida = (rule, value, callback) => {
                let pattrn = /^[1][3,4,5,7,8][0-9]{9}$/g
                if(!pattrn.test(value)){
                    callback(new Error('请输入正确的电话号码！'))
                }else{
                    callback()
                }
            }
            return {
                paramForm:{
                    names:{
                        names : '',
                        arr:[],
                        num:0,
                    },//项目经理名称
                    sexOptions:[
                        {
                            value :1,
                            label:'男',
                        },
                        {
                            value :2,
                            label:'女',
                        },
                    ],//性别下拉框
                    sex:'',//性别
                    age:null,//年龄
                    idCard:'',// 身份证号码
                    iphone:null,//联系电话
                    postcode:null,//邮编
                    aside:'',//通讯地址
                    openDate:null,//任命开始日期
                    endDate:null,//结束日期
                    accredit:{
                        names:'',
                        arr: [],
                        num:0,//0  names没有指导人   1 names有指导人
                    },//授权单位
                    accreditDate:null,//授权日期
                },
                rules: {
                    names: [
                        { required: true },
                    ],
                    sex: [
                        { required: true, message: '必填', trigger: 'blur'},
                    ],
                    iphone: [
                        { required: true,validator: valida, message: '必填', trigger: 'blur' },
                    ],
                    openDate: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    endDate: [
                        { required: true, message: '必填', trigger: 'blur' },
                    ],
                    accredit: [
                        { required: true },
                    ],
                    accreditDate: [
                        { required: true,message: '必填', trigger: 'blur'  },
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
                console.log(1231231231231)
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid && that.paramForm.names.names && that.paramForm.accredit.names) {
                        if(that.paramForm.names.arr.length > 1){
                            alert('一份授权书仅限一名项目经理')
                        }
                        else{
                            console.log(that.paramForm)
                            alert('提交成功！')
                        }
                    } else {
                        alert('有没填完的哦~')
                    }
                })
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
    .last{
        margin-left: 25px;
    }
    .row-bg{
        margin-bottom: 0 !important;
        &>.el-col{
            margin-bottom: 0;
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