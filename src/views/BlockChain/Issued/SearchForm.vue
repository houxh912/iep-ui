<template>
  <iep-dialog :dialog-show="dialogShow" title="查询成员余额" width="600px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px" inline>
      <el-form-item label="成员：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item>
        <iep-button type="primary" @click="submitForm">查询</iep-button>
      </el-form-item>
    </el-form>
    <div>查询此成员余额为: {{balance}}</div>
  </iep-dialog>
</template>
<script>
import { initUserForm, userRules } from './options'
import { getAmountByUserId } from '@/api/fams/block_chain'
export default {
  data () {
    return {
      dialogShow: false,
      form: initUserForm(),
      rules: userRules,
      balance: 0,
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.balance = 0
      this.$emit('load-page')
    },
    submitForm () {
      getAmountByUserId(this.form.user.id).then(({ data }) => {
        this.balance = data.data.balance
      })
    },
  },
}
</script>
