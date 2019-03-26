<template>
   <div>
       <div class="contianBox">
           <el-row>
               <el-col :span="23" class="data">
                   数据推荐
               </el-col>
               <el-col :span="1">
                   <el-button type="small" @click="sumbit">提交</el-button>
               </el-col>
           </el-row>
           <el-row class="topBot">
               <el-col :span="3">
                   审批状态：{{appMsg.status}}
               </el-col>
               <el-col :span="4">
                   申请人：{{appMsg.names}}
               </el-col>
               <el-col :span="4">
                   申请时间：{{appMsg.time}}
               </el-col>
               <el-col :span="4">
                   审批人：{{appMsg.appMan}}
               </el-col>
               <el-col :span="4">
                   审批时间：{{appMsg.appTime}}
               </el-col>
           </el-row>
           <el-row class="bot">
               <el-col :span="7">
                   审批不通过理由：{{appMsg.notThrough}}
               </el-col>
               <el-col :span="10">
                   指导建议：{{appMsg.through}}
               </el-col>
           </el-row>
       </div>
       <!--下方盒子-->
       <div class="contianBox">
           <el-row class="marBot">
               <el-col :span="23" class="data">
                   立项信息
               </el-col>
               <el-col :span="1">
                   <el-button type="small">编辑</el-button>
               </el-col>
           </el-row>
           <el-row>
               <div class="padL">
                   <el-col :span="12" class="marBotBig" v-for="(item, i) in setUp" :key="i">
                       <div v-if="!item.tag">
                           {{item.filed}}： {{item.value}}
                       </div>
                       <div v-else>
                           <div style="float: left;">
                               {{item.filed}}：
                           </div>
                           <div style="float: left;">
                               <div class="tag" v-for="(v,index) in item.value" :key="index">
                                   {{v}}
                               </div>
                           </div>
                       </div>
                   </el-col>
               </div>
           </el-row>
       </div>
       <!-- 弹窗组件 -->
       <transfer-dialog :status="dialogStatus" :dialogVisible="dialogVisible" @listClose = "listClose" :rows = "rows"></transfer-dialog>
   </div>
</template>

<script>
    import TransferDialog from '../TransferDialog'
    export default {
        data (){
            return {
                rows:{
                    id: 1270253,
                    name:'佛山市智慧城市顶层设计规划编制',
                    budget:'立项申请',
                    manay:'GM20190001',
                    stage:'待审批',
                    issue:'杨晓凤',
                    issuename:'张三',
                    ProjectBudget:'30',
                },
                dialogStatus:'',
                dialogVisible:false,
                appMsg:{
                    status:'未提交',//状态
                    names : '殷亚增',//申请人
                    time : '2019-02-22',//申请时间
                    appMan : '张老三',//审批人
                    appTime : '2019-02-22',//审批时间
                    notThrough:'*******(审批不通过的理由内容)',
                    through:'********(指导建议的内容)',
                },
                setUp:[
                    {
                        filed:'编号',
                        value:'GM20190001',
                    },
                    {
                        filed:'项目名称',
                        value:'佛山市智慧城市顶层设计规划编制',
                    },
                    {
                        filed:'项目类型',
                        value:'外部项目',
                    },
                    {
                        filed:'业务类型',
                        value:'咨询-规划',
                    },
                    {
                        filed:'相关客户',
                        value:['佛山市经济和信息化局'],
                        tag:true,
                    },
                    {
                        filed:'项目预算(万元)',
                        value:30,
                    },
                    {
                        filed:'市场经理',
                        value:['殷亚增'],
                        tag:true,
                    },
                    {
                        filed:'项目指导人',
                        value:['王五'],
                        tag:true,
                    },
                    {
                        filed:'项目标签',
                        value:['互联网+政府服务', '顶层规划'],
                        tag:true,
                    },
                    {
                        filed:'是否关联相关产品',
                        value:'是',
                    },
                    {
                        filed:'相关产品',
                        value:['数据基因'],
                        tag:true,
                    },
                    {
                        filed:'承接部门',
                        value:['佛山司马钱信息技术有限公司'],
                        tag:true,
                    },
                    {
                        filed:'合作部门',
                        value:['国脉海洋信息发展有限公司'],
                        tag:true,
                    },
                    {
                        filed:'集团外部合作伙伴',
                        value:['南光文化创意产业有限公司'],
                        tag:true,
                    },
                    {
                        filed:'发布人',
                        value:['殷亚增'],//所以说，殷亚增到底是谁？？？
                        tag:true,
                    },
                    {
                        filed:'发布时间',
                        value:'2019-02-22',
                    },
                ],
            }
        },
        components: { TransferDialog },
        methods:{
            sumbit (){
                this.dialogVisible = true
                this.dialogStatus = 'HandOver'
            },
            listClose (val){
                // console.log(val)
                this.dialogVisible = val
            },
        },
    }
</script>

<style lang="scss" scoped>
    .contianBox{
        border: 1px solid #ccc;
        padding: 3px 15px;
        font-size: 14px;
        margin-bottom: 15px;
    }
    .tag{
        border: 1px solid #ccc;
        overflow: hidden;
        float: left;
        padding: 5px 10px;
        margin-top: -5px;
        margin-right: 10px;
    }
    .topBot{
        margin: 15px 0 20px;
    }
    .marBot{
        margin-bottom: 20px;
    }
    .marBotBig{
        margin-bottom: 25px;
        height: 19.2px;
    }
    .padL{
        padding-left: 30px;
    }
    .bot{
        margin-bottom: 15px;
    }
    .data{
        height: 32px;
        line-height: 32px;
        font-weight: 900;
    }
</style>