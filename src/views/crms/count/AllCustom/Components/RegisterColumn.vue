<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="title">客户登记</span>
      <span> (客户数量：222，联系人数量：3333，拜访次数：44421) </span>
      <operation-search @search="searchPage" advance-search class="search">
      </operation-search>
    </div>
    <div>
      <el-row>
        <el-col :span=12>
          <div class="top">
            <span>部门统计</span>
            <div class="more">
              <span class="border"><i class="el-icon-arrow-left"></i></span>
              <span class="border"><i class="el-icon-arrow-right"></i></span>
            </div>
          </div>
          <div class="echarts odd">图表1</div>
        </el-col>
        <el-col :span=12>
          <div class="top">市场经理</div>
          <div class="echarts">图表2</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span=12>
          <div class="top">
            <span>区域类型</span>
          </div>
          <div class="echarts odd">图表3</div>
        </el-col>
        <el-col :span=12>
          <div class="top">客户增长统计</div>
          <div class="echarts">图表4</div>
        </el-col>
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
.top {
  padding: 10px;
  .more {
    float: right;
    margin-right: 20px;
    .border {
      margin-left: 10px;
      i {
        display: inline-block;
        padding: 5px;
        border: 1px solid #9c9c9c;
      }
      &:hover {
        color: blue;
      }
    }
  }
}
.echarts {
  height: 100px;
  padding: 15px 10px;
  border: 1px solid #eee;
}
.odd {
  margin-right: 20px;
}
</style>
