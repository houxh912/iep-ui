<template>
  <div class="form-dialog">
    <div class="head">
      <div class="name">{{this.formData.projectName}}</div>
      <div class="cancel"><iep-button @click="cancel" type="small">返回</iep-button></div>
    </div>
    <el-form ref="form" :model="formData" :rules="rules">
      <div class="title">
          客户需求
          <iep-tip :content="tipContent.clientRqmt"></iep-tip>
      </div>
      <el-form-item prop="clientRqmt">
        <el-input type="textarea" v-model="formData.clientRqmt" rows=5 placeholder="此处填写客户需求" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title validate">
          本周工作总结
          <iep-tip :content="tipContent.workSummary"></iep-tip>
      </div>
      <el-form-item prop="workSummary">
        <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本周工作总结" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title validate">
          下周工作计划
          <iep-tip :content="tipContent.workPlan"></iep-tip>
      </div>
      <el-form-item prop="workPlan">
        <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下周工作计划" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title">备注</div>
      <el-form-item prop="remark">
        <el-input type="textarea" v-model="formData.remark" rows=5 placeholder="此处填写备注" maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button @click="submit" type="primary" :loading="loadState">保存</iep-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { tipContent, initFormData, rules } from './option'

export default {
  data () {
    return {
      loadState: false,
      formData: initFormData(),
      tipContent,
      selectIndex: -1,
      rules,
    }
  },
  methods: {
    open (projectId, projectName, times) {
      this.formData = initFormData()
      this.formData.projectId = projectId
      this.formData.projectName = projectName
      this.formData.startTime = times.startTime
      this.formData.createTime = times.startTime
      this.formData.endTime = times.endTime
    },
    submit () {
      // 遍历判断 预计回款时间 内的数据是否填写完整
      for (let item of this.formData.paymentRelations) {
        if (item.paymentAmount == '' || item.projectPaymentTime == '') {
          this.$message.error('请完整填写预计回款时间')
          return
        }
      }
      this.$refs['form'].validate((valid) => {
        console.log('valid: ', valid)
        if (valid) {
          this.loadState = true
          this.$emit('putFormData', this.formData)
        } else {
          return false
        }
      })
    },
    handleDelete (index) {
      this.formData.paymentRelations.splice(index, 1)
    },
    handleCreate () {
      this.formData.paymentRelations.push({
        projectPaymentTime: '',
        paymentAmount: '',
      })
    },
    cancel () {
      this.$emit('load-page', false)
    },
    changeNumber (index) {
      this.$nextTick(() => {
        if (this.formData.paymentRelations[index].paymentAmount < 0) {
          this.formData.paymentRelations[index].paymentAmount = 0
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.form-dialog {
  .head {
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    .name {
      font-size: 16px;
      flex: 1;
    }
  }
  .title {
    margin-bottom: 20px;
  }
  .table {
    border: 1px solid #eee;
    .create {
      text-align: center;
      color: $--color-primary;
      cursor: pointer;
    }
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
.validate::before {
  content: "*";
  color: #F56C6C;
  margin-right: 4px;
}
</style>
