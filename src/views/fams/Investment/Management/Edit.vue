<template>
  <div>
    <basic-container>
      <page-header :title="`投资管理 - ${methodName}`" :backOption="backOption"></page-header>
        <el-form ref="form" :model="form" :rules="rules" label-width="190px" size="small">
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="投资组织" prop="investmentOrganization">
                <iep-dict-select v-model="form.investmentOrganization" dict-name=""></iep-dict-select>
              </iep-form-item>
            </el-col>
          </el-row>
           <el-row>
            <el-col :span="12">
              <iep-form-item label-name="股份数量" prop="numberOfShares" tip="股份数量">
                <el-input v-model="form.numberOfShares"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="每股单价" prop="pricePerShare" tip="每股单价">
                <el-input v-model="form.pricePerShare"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="目标金额" prop="targetAmount" tip="目标金额">
                <el-input v-model="form.targetAmount"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="预计年化收益率" prop="predictedAnnualizedReturnRate" tip="预计年化收益率">
                <el-input v-model="form.predictedAnnualizedReturnRate"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="开始日期" prop="startDate">
                <iep-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></iep-date-picker>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="结束日期" prop="endDate">
                <iep-date-picker v-model="form.endDate" type="date" placeholder="选择日期"></iep-date-picker>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="最低认购数量" prop="minimumSubscriptionQuantity" tip="最低认购数量">
                <el-input v-model="form.minimumSubscriptionQuantity"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <iep-form-item label-name="投资人最低信用评分" prop="minimumCreditScore" tip="投资人最低信用评分">
                <el-input v-model="form.minimumCreditScore"></el-input>
              </iep-form-item>
            </el-col>
          </el-row>
          <el-form-item label="">
          <operation-wrapper>
              <iep-button type="primary">保存</iep-button>
              <iep-button @click="onGoBack">取消</iep-button>
            </operation-wrapper>
          </el-form-item>
        </el-form>
    </basic-container>
  </div>
</template>
<script>
import { initForm,rules } from './options'
export default {
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
      return this.id ? '新增' : '编辑'
    },
  },
  methods: {
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
<style>

</style>
