<template>
  <div class="form-dialog">
    <el-form ref="form" :model="formData">
      <el-form-item>
        <el-row>
          <el-col :span=12>
            <div class="title">项目预计签订时间</div>
            <el-col :span=20>
              <IepDatePicker v-model="formData.estimateSignTime"></IepDatePicker>
            </el-col>
          </el-col>
          <el-col :span=12>
            <div class="title">合同签订时间</div>
            <el-col :span=24>
              <IepDatePicker v-model="formData.contractSignTime"></IepDatePicker>
            </el-col>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="title">预计回款时间</div>
      <el-form-item>
        <el-table :data="formData.paymentRelations" style="width: 100%" border>
          <el-table-column prop="projectPaymentTime" label="月份"></el-table-column>
          <el-table-column prop="paymentAmount" label="回款金额"></el-table-column>
          <el-table-column prop="menu" label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <div class="title">客户需求</div>
      <el-form-item prop="clientRqmt">
        <el-input type="textarea" v-model="formData.clientRqmt" rows=5 placeholder="此处填写领导指示"></el-input>
      </el-form-item>
      <div class="title">本周工作总结</div>
      <el-form-item prop="workSummary">
        <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本周工作总结"></el-input>
      </el-form-item>
      <div class="title">下周工作计划</div>
      <el-form-item prop="workPlan">
        <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下周工作计划"></el-input>
      </el-form-item>
      <div class="title">备注</div>
      <el-form-item prop="remark">
        <el-input type="textarea" v-model="formData.remark" rows=5 placeholder="此处填写总结与感悟"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button @click="submit" type="danger">保存</iep-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const initFormData = () => {
  return {
    projectId: 0,
    estimateSignTime: '',
    contractSignTime: '',
    clientRqmt: '',
    workSummary: '',
    workPlan: '',
    remark: '',
    paymentRelations: [],
  }
}

export default {
  data () {
    return {
      formData: initFormData(),
    }
  },
  methods: {
    submit () {
      this.$emit('putFormData', this.formData)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-dialog {
  .title {
    margin-bottom: 20px;
  }
  .detail {
    pre {
      padding-left: 20px;
      line-height: 20px;
      margin: 0;
      min-height: 50px;
    }
    .title {
      font-weight: 700;
      margin-top: 10px;
    }
  }
}
</style>
