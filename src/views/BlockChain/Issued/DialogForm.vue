<template>
  <iep-dialog :dialog-show="dialogShow" title="发行货币" width="600px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="接收者：" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="发币金额：" prop="amount">
        <iep-input-number v-model="form.amount" placeholder="请输入发币金额"></iep-input-number>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="submitForm()">确定</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules, toDtoFrom } from './options'
import { issuedAmount } from '@/api/fams/block_chain'
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
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    submitForm () {
      issuedAmount(toDtoFrom(this.form)).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
