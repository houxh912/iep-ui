<template>
  <basic-container class="news-top">
    <page-header title="国脉要闻"></page-header>
    <template>
      <div class="search-con">
        <operation-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
        <el-button>高级搜索</el-button>
      </div>
    </template>
  </basic-container>
</template>
<style lang="scss" scoped>
.news-top {
  margin: 0 auto;
  width: 1280px;
  background-color: #fafafa;
  .search-con {
    display: flex;
    justify-content: space-between;
  }
}
</style>
<style scoped>
.news-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.news-top >>> .el-input--small input {
  height: 40px !important;
}
.news-top >>> .el-card {
  background-color: #fafafa;
}
</style>
