<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">出单分析</span>
      <operation-search @search="searchPage" advance-search class="search">
      </operation-search>
    </div>
    <div>
      <el-row>
        <div class="echarts">图表1</div>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  methods: {
    searchPage () {

    },
  },
}
</script>

<style lang="scss" scoped>
.clearfix {
  .title {
    font-weight: 700;
    font-size: 18px;
    padding-right: 10px;
  }
}
.search {
  float: right;
}
.echarts {
  height: 100px;
  padding: 15px 10px;
  border: 1px solid #eee;
}
</style>
