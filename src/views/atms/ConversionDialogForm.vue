<template>
  <iep-dialog :dialog-show="dialogShow" title="转化为子任务" width="600px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="100px">
      <el-form-item label="任务名称：">
        <iep-task-atms-select v-model="form.parent.id" :contractName="form.parent.name"></iep-task-atms-select>
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
import { initConversionForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
import { conversionAtms } from '@/api/atms/index'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      form: initConversionForm(),
      rules,
      id: this.$route.params.id,
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initConversionForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      const obj = {
        id:this.id,
        parentId:this.form.parent.id,
        parentName:this.form.parent.name,
      }
      conversionAtms(obj).then(({ data }) => {
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
