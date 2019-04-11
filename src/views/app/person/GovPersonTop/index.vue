<template>
  <div>
    <div class="govPerson-top">
      <h3><span>国脉人，</span>人人都要成为专家</h3>
      <template>
        <div class="search-con">
          <operation-search>
            <advance-search @search-page="searchPage"></advance-search>
          </operation-search>
          <el-button type="danger" plain>高级搜索</el-button>
        </div>
      </template>
    </div>
    <top-class></top-class>
  </div>
</template>
<script>
import TopClass from './TopClass'
export default {
  components: { TopClass },
}
</script>
<style lang="scss" scoped>
.govPerson-top {
  margin: 0 auto;
  padding: 30px 20px;
  text-align: center;
  background: #fafafa url(./linebg.png) no-repeat;
  h3 {
    font-size: 24px;
    span {
      color: #cb3737;
    }
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
.govPerson-top >>> .el-card__body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.govPerson-top >>> .el-input--small input {
  height: 40px !important;
}
.govPerson-top >>> .el-card {
  background-color: #fafafa;
}
.govPerson-top >>> .search-con .input-wrapper {
  max-width: 510px;
  width: 510px;
}
.govPerson-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.govPerson-top >>> .el-button--danger.is-plain:hover,
.govPerson-top >>> .el-button--danger.is-plain:focus {
  background: #cb3737;
  border-color: #ba1b21;
  color: #fff;
}
</style>
