<template>
  <iep-dialog :dialog-show="dialogShow" title="领导批示" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="主题" prop="topic">
        <el-input v-model="form.topic"></el-input>
      </el-form-item>
      <el-form-item label="收件人">
        <el-input v-model="form.person"></el-input>
      </el-form-item>
      <el-form-item label="正文" prop="content">
        <el-input v-model="form.content" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">创建</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm, dictsMap, rules } from './options'
export default {
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.dialogShow = false
    },
  },
}
</script>