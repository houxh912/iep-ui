<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}负责人`" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="100px">
      <el-form-item label="负责人：">
        <iep-contact-select v-model="form.principal"></iep-contact-select>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">确定</iep-button>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initTransferForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
import { transferPrincipal } from '@/api/atms/index'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      methodName: '转交',
      form: initTransferForm(),
      rules,
      id: this.$route.params.id,
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initTransferForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      const obj = {
        id:this.id,
        principalId:this.form.principal.id,
        principalName:this.form.principal.name,
      }
      transferPrincipal(obj).then(({ data }) => {
        if (data.data) {
          this.$message.success('修改成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>
