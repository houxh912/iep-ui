<template>
  <iep-dialog :dialog-show="dialogShow" title="创建联盟" width="60%" @close="close">
    <el-form :model="form" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="联盟名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入联盟名称"></el-input>
      </iep-form-item>
      <iep-form-item label-name="Logo" prop="logo">
        <iep-avatar v-model="form.logo"></iep-avatar>
      </iep-form-item>
      <!-- <iep-form-item label-name="选择组织" prop="orgIds">
        <iep-select v-model="form.orgIds" multiple prefix-url="admin/union/no_union_org"></iep-select>
      </iep-form-item> -->
      <iep-form-item label-name="联盟简介" prop="intro">
        <iep-input-area v-model="form.intro"></iep-input-area>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">提交</iep-button>
        <iep-button @click="close">取消</iep-button>
      </operation-wrapper>
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
      const { data } = await this.formRequestFn(this.form)
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
<style lang="scss" scoped>
.members {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 20px;
  .member {
    width: 100%;
    text-align: center;
  }
}
</style>

