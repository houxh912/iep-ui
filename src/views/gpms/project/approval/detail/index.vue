<template>
  <div class="abs">
    <div class="contianBox">
      <el-row class="topBot">
        <el-col :span="4">审批状态：{{appMsg.status}}</el-col>
        <el-col :span="5">申请人：{{appMsg.names}}</el-col>
        <el-col :span="5">申请时间：{{appMsg.time}}</el-col>
        <el-col :span="5">审批人：{{appMsg.appMan}}</el-col>
        <el-col :span="5">审批时间：{{appMsg.appTime}}</el-col>
      </el-row>
      <el-row class="bot">
        <el-col :span="12">审批不通过理由：{{appMsg.notThrough}}</el-col>
        <el-col :span="12">指导建议：{{appMsg.through}}</el-col>
      </el-row>
    </div>
    <approval-contract :data="contractData"></approval-contract>
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
        contractData: {},
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
    background: #fff;
    .contianBox{
      padding: 20px 25px;
      font-size: 14px;
      margin: 0 20px 15px;
      background-color: #f9f9f9;
      .topBot {
        margin-bottom: 15px;
      }
    }
  }
</style>