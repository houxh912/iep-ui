<template>
  <iep-dialog :dialog-show="dialogShow" title="模块" width="550px" @close="close">
    <el-form :model="form" :rules="rules" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="模块名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio v-for="(item,i) in dictsMap.status" :key="i" :label="+i">{{item}}</el-radio>
        </el-radio-group>
      </iep-form-item>
      <iep-form-item label-name="模块说明" prop="description">
        <iep-input-area v-model="form.description"></iep-input-area>
      </iep-form-item>
      <iep-form-item label-name="关联菜单" prop="menuId">
        <iep-select v-model="form.menuId" autocomplete="off" prefix-url="admin/menu/parent" placeholder="请选择关联菜单"></iep-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">提交</iep-button>
      <iep-button @click="dialogShow = false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import formMixins from '@/mixins/formMixins'
import { initForm, dictsMap } from './options'
export default {
  mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      rules: {
        name: [
          { required: true, message: '请输入模块名称', trigger: 'blur' },
        ],
      },
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

