<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="`投资 - ${methodName}`" :backOption="backOption"></iep-page-header>
      <el-form class="form-detail" ref="form" :model="form" :rules="rules" label-width="190px" size="small">
        <iep-form-item label-name="组织" prop="orgId">
          <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择组织"></iep-select>
        </iep-form-item>
        <iep-form-item label-name="总股本" prop="allSharesNumber">
          <iep-input-number v-model="form.allSharesNumber" step-strictly></iep-input-number>
        </iep-form-item>
        <iep-form-item label-name="发行价" prop="sharesUnivalent">
          <iep-input-amount v-model="form.sharesUnivalent" disabled></iep-input-amount>
        </iep-form-item>
        <iep-form-item label-name="持有类型" prop="holdType">
          <iep-dict-select v-model="form.holdType" dict-name="FAMS_HOLD_TYPE" disabled></iep-dict-select>
        </iep-form-item>
        <iep-form-item label-name="持有比例">
          100%
        </iep-form-item>
        <iep-form-item label-name="股本类型" prop="equityType">
          <iep-dict-select v-model="form.equityType" dict-name="FAMS_EQUITY_TYPE" disabled></iep-dict-select>
        </iep-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button @click="handleSubmit" type="primary">保存</iep-button>
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
}
</script>
<style>
</style>
