<template>
  <iep-dialog :dialog-show="dialogShow" title="审核-通过" width="700px" @close="loadPage">
    <el-form :model="form" :rules="rules" size="small" ref="form">
      <el-form-item>
        <el-input type="textarea" v-model="form.desc" placeholder="备注" :autosize="{ minRows: 8, maxRows: 12}"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">保存</iep-button>
      <iep-button @click="loadPage">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { initForm } from './options'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
    }
  },
  methods: {
    handleClose (contract) {
      this.contractList.splice(this.contractList.indexOf(contract), 1)
    },
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

