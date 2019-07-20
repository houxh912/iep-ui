<template>
  <div class="news_detail">
    <iep-page-header :title="formData.title" :backOption="backOption"></iep-page-header>
    <!-- <iep-img :src="formData.image"></iep-img> -->
    <el-row class="content">
      <iep-html v-model="formData.content"></iep-html>
    </el-row>
    <el-row class="footer">
      <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
    </el-row>
  </div>
</template>

<script>
import { getPageById } from '@/api/conm/article_controller'
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.history.go(-1)
        },
      },
      formData: {
        tagKeyWords: [],
      },
    }
  },
  created () {
    this.id = this.$route.params.id
    this.loadPage()
  },
  methods: {
    loadPage () {
      getPageById(this.id).then(({ data }) => {
        this.formData = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.news_detail {
  width: 1200px;
  padding: 20px 0;
  margin: auto;
  .content {
    margin-bottom: 20px;
  }
}
</style>
