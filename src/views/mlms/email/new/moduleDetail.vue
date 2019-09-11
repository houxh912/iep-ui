<template>
  <iep-dialog :dialog-show="dialogShow" title="模板详情" width="80%" @close="resetForm">
    <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
      <template slot="left">
        <span>模块名称：{{form.name}}</span>
      </template>
    </operation-container>
    <div class="container">
      <div class="con-item">
        <div class="title">文档内容</div>
        <iep-html v-model="form.content"></iep-html>
      </div>
    </div>
    <template slot="footer">
      <iep-button type="primary" @click="handleSelect()">选择</iep-button>
      <iep-button @click="dialogShow=false">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>

import { getPageById } from '@/api/ims/module_management'
import { initForm } from '../../ModelManagement/options'
export default {
  data () {
    return {
      dialogShow: false,
      templateId: '',
      form: initForm(),
    }
  },
  methods: {
    resetForm () {
      this.dialogShow = false
    },
    loadPage () {
      getPageById(this.templateId).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
    handleSelect () {
      this.$emit('confirm-select',this.form.content)
      this.dialogShow = false
    },
  },
}
</script>
<style scoped lang='scss'>
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 18px;
    .title {
      margin-bottom: 10px;
      font-size: 15px;
      color: #333;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>