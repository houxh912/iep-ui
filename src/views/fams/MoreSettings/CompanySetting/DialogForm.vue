<template>
  <iep-dialog :title="methodName" :dialog-show="dialogShow" width="600px" @close="close">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" size="small" label-width="140px">
      <el-form-item label="父公司：" v-if="!!form.parentId">
        <iep-div-detail :value="form.parentName"></iep-div-detail>
      </el-form-item>
      <el-form-item label="线下公司：" prop="name">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入线下公司名称"></el-input>
      </el-form-item>
      <el-form-item label="户头所属组织：" prop="orgId">
        <iep-select v-model="form.orgId" autocomplete="off" prefix-url="admin/org/all" placeholder="请选择户头所属组织"></iep-select>
      </el-form-item>
      <el-form-item label="关联银行账户：" prop="bankAccountIds">
        <iep-select v-model="form.bankAccountIds" multiple autocomplete="off" prefix-url="fams/bank_account" placeholder="请选择户头所属组织"></iep-select>
      </el-form-item>
      <el-form-item label="纳税人识别号：" prop="taxpayerNumber">
        <el-input v-model="form.taxpayerNumber" autocomplete="off" placeholder="请输入纳税人识别号"></el-input>
      </el-form-item>
      <el-form-item label="电话：" prop="phone">
        <el-input v-model="form.phone" autocomplete="off" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <iep-input-area v-model="form.address" autocomplete="off" placeholder="请输入地址"></iep-input-area>
      </el-form-item>
      <el-form-item label="经营范围：" prop="businessScope">
        <iep-input-area v-model="form.businessScope" autocomplete="off" placeholder="请输入经营范围"></iep-input-area>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen()">确 定</iep-button>
      <iep-button @click="close">取 消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, rules } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      rules,
      methodName: '新增',
      form: initForm(),
      dialogShow: false,
      formRequestFn: () => { },
    }
  },
  methods: {
    async submitForm () {
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
    close () {
      this.dialogShow = false
      this.form = initForm()
      this.$emit('load-page')
    },
  },
}
</script>
