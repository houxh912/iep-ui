<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑模块" width="500px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="负责人" prop="user">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </iep-form-item>
      <iep-form-item label-name="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="(item, idx) in dictsMap.status" :key="idx" :label="idx">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, toDtoForm, dictsMap } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(toDtoForm(this.form))
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>

