<template>
  <iep-dialog :dialog-show="dialogShow" title="创建投资" width="500px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <iep-form-item label-name="股份数量" prop="investmentNumber">
        <iep-input-number disabled v-model="form.investmentNumber"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="投资金额" prop="totalAmount">
        <iep-input-number v-model="form.totalAmount" :max="form.targetAmount"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="支付方式" prop="investmentMoneyType">
        <el-radio-group v-model="form.investmentMoneyType" disabled>
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资组织" prop="orgId">
        <iep-select disabled v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, formToDto, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      try {
        await this.mixinsValidate()
        try {
          const { data } = await this.formRequestFn(formToDto(this.form))
          if (data.data) {
            this.$message({
              message: '操作成功',
              type: 'success',
            })
            this.loadPage()
          } else {
            this.$message({
              message: data.msg,
              type: 'error',
            })
          }
        } catch (error) {
          this.$message({
            message: error.message,
            type: 'error',
          })
        }
      } catch (object) {
        let message = ''
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            const element = object[key]
            message = element[0].message
          }
        }
        this.$message(message)
      }
    },
  },
  watch: {
    'form.totalAmount': function (n) {
      this.form.investmentNumber = Math.round( n / this.form.sharesUnivalent *100)/100
    },
  },
}
</script>