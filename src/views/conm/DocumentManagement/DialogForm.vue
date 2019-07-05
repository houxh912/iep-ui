<template>
  <iep-dialog :dialog-show="dialogShow" :title="`文档${methodName}`" width="500px" @close="loadPage">
    <el-form class="form-detail" :model="form" size="small" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tagKeyWords">
        <iep-tag v-model="form.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="发布时间" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="datetime" placeholder="请选择发布时间">
        </iep-date-picker>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="0">禁用</el-radio>
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
import { getPageById } from '@/api/conm/article_controller'
import { initForm, dictsMap, rules } from './options'
import formMixins from '@/mixins/formMixins'
// import { mapGetters } from 'vuex'
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
  // },
  methods: {
    loadPage () {
      this.form = initForm()
      this.loadTypeList()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getPageById(this.id).then(({ data }) => {
        console.log(data.data)
      })
    },
    async submitForm () {
      this.formRequestFn({ nodeId: this.id, ...this.form }).then(({ data }) => {
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