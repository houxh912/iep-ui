<template>
  <div class="tasks">
    <basic-container>
      <page-header title="我的投资"></page-header>
      <div class="investment-info">
        <span>我的投资模块主要为个人在内网中进行股权投资的模块，用户可在该模块下进行个人投资的管理、查看收益的统计等</span>
        <span class="red">我的投资模块还在开发中，敬请期待，本页面仅为样式效果演示</span>
      </div>
      <el-card class="investment-item" shadow="hover">
        <ul>
          <li>
            <span class="num">50000.5</span>
            <span class="sub-title">投资金额</span>
          </li>
          <li>
            <span class="num">1000.00</span>
            <span class="sub-title">收益金额</span>
          </li>
          <li>
            <div class="investment-box">
              <span class="num">8/24</span>
              <span class="sub-title">收益排名</span>
            </div>
            <div class="investment">马上投资</div>
          </li>
        </ul>
      </el-card>
      <div class="investment-content left">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>投资明细</span>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="投资公司"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="投资方式"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="投资金额">
            </el-table-column>
            <el-table-column
              prop="time"
              label="投资时间">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </basic-container>
  </div>
</template>
<script>
export default {
  data () {
    return{
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        time:'2019-04-23',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        time:'2019-04-23',
      }],
    }
  },
}
</script>

<style scoped lang="scss">
.investment-info{
  padding:15px;
  margin-bottom: 15px;
  border: 1px solid #eac86d;
  background-color: #f4ecd3;
  span{
    display:block;
    line-height: 28px;
    color: #333;
  }
}
.red{
  color:#ba1b21!important;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.investment-item {
  margin-bottom:20px;
  ul{
    padding:15px 0;
    li{
      display:inline-block;
      padding: 0 50px;
      border-right: 1px solid #ddd;
      .investment,.investment-box{
        display:inline-block;
      }
      .investment-box{
        margin-right: 50px;
      }
      .investment{
        border: 1px solid #ba1b21;
        padding: 3px 14px;
        border-radius: 3px;
        color:#fff;
        background-color: #ba1b21;
        vertical-align: 16px;
        cursor: pointer;
      }
    }
    li:nth-last-child(1){
      border-right: none;
    }
  }
  span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 24px;
    }
    .sub-title {
      color: #999;
    }
}
</style> 