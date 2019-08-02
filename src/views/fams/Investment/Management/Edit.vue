<template>
  <div>
    <basic-container>
      <iep-page-header :title="`投资管理 - ${methodName}`" :backOption="backOption"></iep-page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="190px" size="small">
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="投资组织" prop="orgId">
              <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择投资组织"></iep-select>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="股份数量" prop="allSharesNumber" tip="股份数量">
              <iep-input-number v-model="form.allSharesNumber"></iep-input-number>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="每股单价" prop="sharesUnivalent" tip="每股单价">
              <iep-input-amount v-model="form.sharesUnivalent"></iep-input-amount>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="目标金额" prop="targetAmount" tip="目标金额">
              <iep-input-number v-model="form.targetAmount" disabled></iep-input-number>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="开始日期" prop="startTime">
              <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="结束日期" prop="endTime">
              <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="最低认购数量" prop="minimumBuy" tip="最低认购数量">
              <iep-input-number v-model="form.minimumBuy" :max="form.allSharesNumber"></iep-input-number>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="投资人最低信用评分" prop="minimumCredit" tip="投资人最低信用评分">
              <iep-input-number v-model="form.minimumCredit"></iep-input-number>
            </iep-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button @click="handleSubmit" type="primary">保存</iep-button>
            <iep-button @click="onGoBack">取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getInvestmentById, postInvestment, putInvestment } from '@/api/fams/investment'
import { initForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      rules,
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    requestFunc () {
      if (this.id) {
        return putInvestment
      } else {
        return postInvestment
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        getInvestmentById(this.id).then(({ data }) => {
          this.form = data.data
        })
      }
    },
    async handleSubmit () {
      try {
        await this.mixinsValidate()
        this.requestFunc(this.form).then(({ data }) => {
          if (data.data) {
            this.$message.success('操作成功')
            this.onGoBack()
          } else {
            this.$message(data.msg)
          }
        })
      } catch (object) {
        this.mixinsMessage(object)
      }
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
  watch: {
    'form.allSharesNumber': function (n) {
      this.form.targetAmount = this.form.sharesUnivalent * n
    },
    'form.sharesUnivalent': function (n) {
      this.form.targetAmount = this.form.allSharesNumber * n
    },
  },
}
</script>
<style>
</style>
