<template>
  <iep-dialog :dialog-show="dialogShow" title="发起交易" width="600px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="接收者：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="交易金额：" prop="amount">
        <iep-input-number v-model="form.amount" placeholder="请输入交易金额"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="submitForm()">交易</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
      rules,
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm () {

    },
  },
}
</script>
