<template>
  <div class="news-top">
    <h3>国脉要闻</h3>
    <template>
      <div class="search-con">
        <operation-search>
          <advance-search @search-page="searchPage"></advance-search>
        </operation-search>
        <el-button>高级搜索</el-button>
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.news-top {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background: #fafafa url(./linebg.png) no-repeat;
  h3 {
    font-size: 24px;
  }
  .search-con {
    display: flex;
    margin: 0 auto;
    max-width: 600px;
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
.news-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
</style>
