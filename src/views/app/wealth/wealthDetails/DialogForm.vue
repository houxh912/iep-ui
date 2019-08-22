<template>
  <iep-dialog :dialog-show="dialogShow" :title="`当前剩余股权数：${form.remainSharesNumber}，最低投资（${form.minimumBuy}）股份`" width="500px" @close="loadPage">
    <el-form :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <iep-form-item label-name="股份数量" prop="investmentNumber">
        <iep-input-number v-model="form.investmentNumber" :min="form.minimumBuy" :max="form.remainSharesNumber" :precision="0"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="投资金额" prop="totalAmount">
        <iep-input-number disabled v-model="form.totalAmount"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="支付方式" prop="investmentMoneyType">
        <el-radio-group v-model="form.investmentMoneyType" disabled>
          <el-radio v-for="(item, idx) in dictsMap.investmentMoneyType" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="投资组织" prop="orgId">
        <iep-select disabled v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择向哪个组织投资"></iep-select>
      </iep-form-item>
      <div class="agree-wrapper">
        <el-checkbox v-model="checked">
        </el-checkbox>
        我已查看
        <el-link type="primary" @click="handleOpen('https://www.yuque.com/govmade/dzsv2m/lzdm4e','激励股权认购须知')">激励股权认购须知</el-link>
        <iep-divider type="vertical"></iep-divider>
        <el-link type="primary" @click="handleOpen('https://www.yuque.com/govmade/dzsv2m/toymli','投资风险告知说明')">投资风险告知说明</el-link>
      </div>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()" :disabled="!checked">提交</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, formToDto, rules } from './options'
import formMixins from '@/mixins/formMixins'
import { openWindow } from '@/util/util'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      checked: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  computed: {
  },
  methods: {
    handleOpen (url, name) {
      openWindow(url, name, 1400, 900)
    },
    loadPage () {
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
              message: `感谢您投资${this.form.orgName}公司。未来，请让我们一起继续携手相伴，披荆斩棘，共闯前路！`,
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
        this.mixinsMessage(object)
      }
    },
  },
  watch: {
    // 'form.totalAmount': function (n) {
    //   this.form.investmentNumber = Math.round( n / this.form.sharesUnivalent *100)/100
    // },
    'form.investmentNumber': function (n) {
      this.form.totalAmount = this.form.sharesUnivalent * n
    },
  },
}
</script>
<style lang="scss" scoped>
.agree-wrapper {
  text-align: center;
}
</style>
