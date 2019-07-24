<template>
  <div class="expert-search">
    <div class="search-con">
      <operation-search @search-page="searchPage"></operation-search>
      <el-button type="danger" plain>高级搜索</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  },
  methods: {
    searchPage (val) {
      this.$emit('load-page', val)
    },
  },
}
</script>
<style scoped  lang="scss">
.expert-search {
  margin: 0 auto 25px;
  text-align: center;
  width: 1200px;
  h3 {
    font-size: 24px;
    position: relative;
    .count {
      font-size: 14px;
      color: #999;
    }
    .publish {
      font-size: 14px;
      color: #cb3737;
      position: absolute;
      right: 0;
      line-height: 45px;
      cursor: pointer;
    }
  }
}
.search-con {
  display: flex;
  margin: 0 auto;
  max-width: 600px;
  justify-content: space-between;
}
</style>
<style scoped>
.expert-search >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.expert-search >>> .el-input--small input {
  height: 40px !important;
}
.expert-search >>> .el-card {
  background-color: #fafafa;
}
.expert-search >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.expert-search >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.expert-search >>> .el-button--danger.is-plain:hover,
.expert-search >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>