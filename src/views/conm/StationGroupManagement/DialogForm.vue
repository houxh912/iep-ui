<template>
  <iep-dialog :dialog-show="dialogShow" :title="`站点${methodName}`" width="500px" @close="close">
    <el-form
      class="form-detail"
      :model="form"
      size="small"
      ref="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="上级站点" prop="superiorSite">
        <iep-select
          v-model="form.superiorSite"
          autocomplete="off"
          prefix-url="fams/company"
          placeholder="请选择收入公司"
        ></iep-select>
      </el-form-item>
      <el-form-item label="组织" prop="organization">
        <iep-select
          v-model="form.organization"
          autocomplete="off"
          prefix-url="admin/org/all"
          placeholder="请选择收入公司"
        ></iep-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="domainName">
        <el-input v-model="form.domainName"></el-input>
      </el-form-item>
      <el-form-item label="手机端域名" prop="phoneName">
        <el-input v-model="form.phoneName"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">正常</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, rules } from './options'
// import formMixins from '@/mixins/formMixins'
// import { mapGetters } from 'vuex'
export default {
  // mixins: [formMixins],
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initForm(),
      rules,
    }
  },
  // },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>