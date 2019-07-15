<template>
  <div>
    <basic-container>
      <iep-page-header title="文档管理详情" :backOption="backOption"></iep-page-header>
      <operation-container style="border-bottom: 1px solid #eee;padding-bottom:15px;">
        <template slot="left">
          <span>标题：{{form.title}}</span>
          <span>发布日期：{{form.createTime|parseToDay}}</span>
        </template>
      </operation-container>
      <div class="container">
        <div class="con-item">
          <div class="title">浏览数</div>
          <iep-div-detail class="content" :value="form.views"></iep-div-detail>
        </div>
        <div class="con-item">
          <div class="title">内容</div>
          <iep-froala-editor v-model="form.content"></iep-froala-editor>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getPageById } from '@/api/conm/article_controller'
function initForm () {
  return {
    title: '',
    createTime: '',
    views: '',
    content: '',
  }
}
export default {
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initForm(),
      id: '',
    }
  },
  created () {
    this.id = this.$route.params.id
    this.loadPage()
  },
  methods: {
    loadPage () {
      getPageById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(this.form, data.data)
      })
    },
  },
}
</script>

<style scoped lang='scss'>
.container {
  padding: 0 10px;
  .con-item {
    margin-bottom: 15px;
    .title {
      font-size: 15px;
      color: #333;
    }
    .content {
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
      padding: 15px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
