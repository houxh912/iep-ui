<template>
    <div v-if="detailShow" class="abs">
        <el-row class="title">
            <el-col :span="22" class="title-plain">
                详情
            </el-col>
            <el-col :span="2" class="title-bot">
                <el-button size="small" @click="close">返回</el-button>
            </el-col>
        </el-row>
        <div class="contianBox">
            <el-row>
                <el-col :span="23" class="data">
                    数据推荐
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
        <approval-contract></approval-contract>
    </div>
</template>

<script>
    import ApprovalContract from './ApprovalContract'
    export default {
        name: 'detail-dialog',
        data (){
            return {
                appMsg:{
                    status:'未提交',//状态
                    names : '殷亚增',//申请人
                    time : '2019-02-22',//申请时间
                    appMan : '张老三',//审批人
                    appTime : '2019-02-22',//审批时间
                    notThrough:'*******(审批不通过的理由内容)',
                    through:'********(指导建议的内容)',
                },

            }
        },
        components:{ApprovalContract},
        methods:{
            close (){
                this.$emit('close',false)
            },
        },
        props: {
            detailShow: {
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
        overflow: auto;
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
    .contianBox{
        border: 1px solid #ccc;
        padding: 3px 15px;
        font-size: 14px;
        margin: 0 20px 15px;
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
        color: #666;
        line-height: 32px;
        font-weight: 900;
    }
</style>