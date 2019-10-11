<template>
  <iep-dialog :dialog-show="dialogShow" :title="`推荐位${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="上级站点">
        <el-input v-model="siteId" disabled></el-input>
      </el-form-item>
      <el-form-item label="属性名称" prop="attributeName">
        <el-input v-model="form.attributeName" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="属性编码" prop="attributeNumber">
        <el-input v-model="form.attributeNumber" maxlength="100" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageDetailById } from '@/api/conm/attribute_controller'
import { initForm, dictsMap, rules } from './options'
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
      id: 0,
      siteId: 0,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getPageDetailById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    async submitForm () {
      this.formRequestFn({ siteId: this.siteId, attributeId: this.id, ...this.form }).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>