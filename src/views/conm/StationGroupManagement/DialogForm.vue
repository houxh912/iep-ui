<template>
  <iep-dialog :dialog-show="dialogShow" :title="`站点${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" :rules="rules" label-width="120px">
      <el-form-item label="上级站点">
        <el-input v-model="form.parentId" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="siteName">
        <el-input v-model="form.siteName"></el-input>
      </el-form-item>
      <el-form-item label="域名">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="手机端域名">
        <el-input v-model="form.mobileUrl"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <iep-form-item label-name="管理员">
        <iep-contact-multiple-user v-model="form.manageList"></iep-contact-multiple-user>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageById } from '@/api/conm/index'
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
      id: '',
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
      getPageById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    async submitForm () {
      this.form.manageList = this.form.manageList.map(a => a.id)
      this.formRequestFn({ id: this.id, ...this.form }).then(({ data }) => {
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