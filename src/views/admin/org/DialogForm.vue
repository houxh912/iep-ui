<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}组织`" width="50%" @close="loadPage">
    <div class="avatar" style="text-align: center;margin-bottom:20px;">
      <iep-img-avatar :size="128" :src="form.logo"></iep-img-avatar>
    </div>
    <el-form class="form-detail" :model="form" :rules="rules" ref="form" size="small" label-width="100px">
      <iep-form-item label-name="组织名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="组织类别" prop="orgType">
        <iep-dict-select v-model="form.orgType" dict-name="GOMS_ORG_TYPE"></iep-dict-select>
      </iep-form-item>
      <iep-form-item label-name="允许加入" prop="isOpen">
        <el-switch v-model="form.isOpen" :active-value="0" :inactive-value="1"></el-switch>
      </iep-form-item>
      <iep-form-item label-name="组织排序" prop="orgSort">
        <iep-input-number v-model="form.orgSort"></iep-input-number>
      </iep-form-item>
      <iep-form-item label-name="组织模块" prop="moduleIds">
        <iep-select v-model="form.moduleIds" autocomplete="off" multiple prefix-url="admin/module" placeholder="请选择关联模块"></iep-select>
      </iep-form-item>
      <iep-form-item label-name="组织描述" prop="intro">
        <iep-input-area v-model="form.intro"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">{{methodName}}</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
        ],
        intro: [
          { required: true, message: '请填写组织描述', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success(`${this.methodName}成功`)
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>
