<template>
  <div class="detail">
    <h3 class="title">{{formData.title}}</h3>
    <div class="sub-title">
      <div class="left">
        <span>作者：{{formData.creatorName}}</span>
        <span>发布日期：{{formData.updateTimel}}</span>
      </div>
      <div class="right">
        <span><i class="icon-yanjing"></i> {{formData.views}}人浏览</span>
      </div>
    </div>
    <!-- <iep-img class="img" :src="formData.image"></iep-img> -->
    <el-row class="content">
      <iep-html v-model="formData.content"></iep-html>
    </el-row>
    <el-row class="footer">
      <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
    </el-row>
  </div>
</template>

<script>
import { getPageByIndexId } from '@/api/conm/article_controller'
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
      getPageByIndexId(this.id).then(({ data }) => {
        this.formData = data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  width: 1200px;
  margin: auto;
  .img {
    max-width: 800px;
    margin: auto;
    display: block;
  }
  .title {
    font-size: 22px;
    text-align: center;
    font-weight: 700;
  }
  .sub-title {
    margin: 40px 0 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    .left {
      span {
        margin-right: 20px;
      }
    }
  }
  .content {
    margin-bottom: 40px;
  }
}
</style>
