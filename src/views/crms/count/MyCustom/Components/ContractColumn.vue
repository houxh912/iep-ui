<template>
  <el-card shadow="hover">
    <el-row class="contract">
      <el-col class="head" :span=20>合同概况<span class="sub">（本月已签订合同金额共￥1,000,000）</span></el-col>
      <el-col class="btn" :span=4>
        <el-dropdown>
          <el-button>
            本月<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>上月</el-dropdown-item>
            <el-dropdown-item>上月</el-dropdown-item>
            <el-dropdown-item>上月</el-dropdown-item>
            <el-dropdown-item>上月</el-dropdown-item>
            <el-dropdown-item>上月</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <div class="echarts">
      图表

    </div>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      infoList: {
        num: 12,
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.contract {
  .head {
    font-weight: 700;
    background-color: #eee;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    .sub {
      font-weight: 500;
      font-size: 14px;
      color: #666;
    }
  }
  .btn {
    // align-items: center;
    text-align: right;
  }
}
.echarts {
  height: 300px;
  width: 100%;
  padding: 20px 10px;
  margin-top: 20px;
  border: 1px solid #eee;
}
</style>
