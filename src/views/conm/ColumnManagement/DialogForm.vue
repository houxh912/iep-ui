<template>
  <iep-dialog :dialog-show="dialogShow" :title="`栏目${methodName}`" width="500px" @close="loadPage">
    <el-form
      class="form-detail"
      :model="form"
      size="small"
      ref="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="所属栏目" prop="parentName">
        <el-input v-model="form.parentName" disabled></el-input>
      </el-form-item>
      <el-form-item label="栏目名称" prop="nodeName">
        <el-input v-model="form.nodeName"></el-input>
      </el-form-item>
      <!-- <el-form-item label="生成静态文件" prop="static">
        <el-radio-group v-model="form.static">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- <el-form-item label="内容模型" prop="modelId">
         <el-input v-model="form.modelId"></el-input>
      </el-form-item>-->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标签" prop="tagKeyWords">
        <iep-tag v-model="form.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="栏目描述" prop="nodeDescribe">
        <el-input type="textarea" v-model="form.nodeDescribe"></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm()">提交</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { getPageById } from '@/api/conm/node_controller'
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
      siteId: '',
      id: '',
    }
  },
  // },
  created () {

  },
  methods: {
    loadPage () {
      this.form = initForm()
       this.loadTypeList()
      this.dialogShow = false
      this.$emit('load-page')
    },
    loadTypeList () {
      getPageById(this.id).then(({ data }) => {
        this.form.tagKeyWords = data.data.tagKeyWords
      })
    },
    async submitForm () {
      this.formRequestFn({id: this.id,siteId: this.siteId, ...this.form }).then(({ data }) => {
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