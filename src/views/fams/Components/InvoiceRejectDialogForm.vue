<template>
  <iep-dialog :dialog-show="dialogShow" title="驳回" width="520px" @close="dialogShow=false">
    <el-form size="small" ref="form" label-width="100px">
      <el-form-item label="备注">
        <iep-input-area v-model="content"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">驳回</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { myRejectInvoice, rejectInvoice } from '@/api/fams/invoice'
export default {
  props: {
    isFinancial: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      dialogShow: false,
      id: '',
      content: '',
    }
  },
  computed: {
    useFunction () {
      return this.isFinancial ? rejectInvoice : myRejectInvoice
    },
  },
  methods: {
    submitForm () {
      this.useFunction({
        id: this.id,
        content: this.content,
      }).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.close()
        } else {
          this.$message(data.msg)
        }
      })
    },
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

