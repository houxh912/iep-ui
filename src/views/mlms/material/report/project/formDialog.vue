<template>
  <div class="form-dialog">
    <div class="head">
      <div class="name">{{this.formData.projectName}}</div>
      <div class="cancel"><iep-button @click="cancel" type="small">返回</iep-button></div>
    </div>
    <el-form ref="form" :model="formData">
      <el-form-item>
        <el-row>
          <el-col :span=12>
            <div class="title validate">项目预计签订时间</div>
            <el-col :span=20>
              <IepDatePicker v-model="formData.estimateSignTime"></IepDatePicker>
            </el-col>
          </el-col>
          <el-col :span=12>
            <div class="title validate">合同签订时间</div>
            <el-col :span=24>
              <IepDatePicker v-model="formData.contractSignTime"></IepDatePicker>
            </el-col>
          </el-col>
        </el-row>
      </el-form-item>
      <div class="title">预计回款时间</div>
      <el-form-item class="table">
        <el-table :data="formData.paymentRelations" style="width: 100%">
          <el-table-column prop="projectPaymentTime" label="月份">
            <template slot-scope="scope">
              <el-date-picker
                v-model="formData.paymentRelations[scope.$index].projectPaymentTime"
                type="month"
                placeholder="选择时间"
                format="yyyy-MM"
                value-format="yyyy-MM">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="paymentAmount" label="回款金额">
            <template slot-scope="scope">
              <el-input 
                v-if="selectIndex==scope.$index" 
                v-model="formData.paymentRelations[scope.$index].paymentAmount" 
                @blur="()=>{changeNumber(scope.$index);selectIndex=-1}" 
                maxlength="10" 
                type="number" 
                min=0
                placeholder="请输入正确的数额"></el-input>
              <el-input v-else v-model="scope.row.paymentAmount" @focus="selectIndex=scope.$index" style="min-height: 20px;"></el-input>
              <!-- <el-input v-if="selectIndex==scope.$index" v-model="formData.paymentRelations[scope.$index].paymentAmount" @blur="selectIndex=-1" maxlength="10"></el-input>
              <div v-else @click="selectIndex=scope.$index" style="min-height: 20px;">{{scope.row.paymentAmount}}</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="menu" label="操作" width="200px">
            <template slot-scope="scope">
              <iep-button size="small" @click="handleDelete(scope.$index)">删除</iep-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="create" @click="handleCreate"><i class="el-icon-plus"></i> 新增</div>
      </el-form-item>
      <div class="title">客户需求</div>
      <el-form-item prop="clientRqmt">
        <el-input type="textarea" v-model="formData.clientRqmt" rows=5 placeholder="此处填写客户需求" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title validate">本周工作总结</div>
      <el-form-item prop="workSummary">
        <el-input type="textarea" v-model="formData.workSummary" rows=5 placeholder="此处填写本周工作总结" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title validate">下周工作计划</div>
      <el-form-item prop="workPlan">
        <el-input type="textarea" v-model="formData.workPlan" rows=5 placeholder="此处填写下周工作计划" maxlength="1000"></el-input>
      </el-form-item>
      <div class="title">备注</div>
      <el-form-item prop="remark">
        <el-input type="textarea" v-model="formData.remark" rows=5 placeholder="此处填写备注" maxlength="1000"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button @click="submit" type="primary">保存</iep-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const initFormData = () => {
  return {
    projectId: 0,
    projectName: '',
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
      selectIndex: -1,
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
        console.log('item: ', item)
        if (item.paymentAmount == '' || item.projectPaymentTime == '') {
          this.$message.error('请完整填写预计回款时间')
          return
        }
      }
      this.$emit('putFormData', this.formData)
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
      color: #ba1b21;
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
