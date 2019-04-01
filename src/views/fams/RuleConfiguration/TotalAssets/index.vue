<template>
  <div>
    <basic-container>
      <div class="main-top">
        <el-card class="left" shadow="hover">
          <h4 class="title">内网运维</h4>
          <ul>
            <li>
              <span class="num">1325.5</span>
              <span class="sub-title">系统账户余额</span>
            </li>
            <li>
              <span class="num">6000</span>
              <span class="sub-title">发行数</span>
            </li>
            <li>
              <span class="num">1500</span>
              <span class="sub-title">内部往来帐</span>
            </li>
            <li>
              <span class="num">3000</span>
              <span class="sub-title">系统支出</span>
            </li>
            <li>
              <span class="num">550</span>
              <span class="sub-title">系统收入</span>
            </li>
            <li>
              <span class="num">240</span>
              <span class="sub-title">提现数</span>
            </li>
          </ul>
        </el-card>
        <el-card class="right" shadow="hover">
          <h4 class="title">快捷入口</h4>
          <ul>
            <li>部门打赏扣减</li>
            <li>个人打赏折扣</li>
          </ul>
        </el-card>
      </div>
      <div class="content">
        <el-card class="box-card">
          <operation-container>
            <template slot="left">
              <page-header title="内网资金分布情况"></page-header>
            </template>
            <template slot="right">
              <div class="time">
                <div class="time-text">
                  <span>昨日</span>
                  <span>今日</span>
                  <span>本周</span>
                  <span>本月</span>
                  <span class="active">全年</span>
                </div>
                <div class="block">
                  <el-date-picker v-model="value6" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </div>
              </div>
            </template>
          </operation-container>
          <a-divider />
          <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
            <v-tooltip />
            <v-axis />
            <v-bar position="dept*money" color="#CB3737"/>
          </v-chart>
        </el-card>

      </div>
    </basic-container>
  </div>
</template>
<script>
const data = [
  { dept: '在职员工', money: 18 },
  { dept: '部门', money: 7 },
  { dept: '离职员工', money: 11 },
  { dept: '员工提现', money: 4 },
  { dept: '系统回收', money: 8 },
  { dept: '内部往来账', money: 2 },
  { dept: '集团账户余额', money: 2 },
]
const scale = [{
  dataKey: 'money',
  tickInterval: 5,
}]
export default {
  data () {
    return {
      data,
      scale,
      height: 400,
      value6: '',
    }
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main-top,
ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-top {
  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
  .left {
    flex: 1;
    margin-right: 20px;
    li {
      padding: 12px 40px;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border: 0;
      }
    }
  }
  .right {
    flex: 0 0 300px;
    ul {
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      li {
        cursor: pointer;
        padding: 10px 15px;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
  }
  ul {
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
}
.content {
  margin-top: 20px;
}
</style>

<style lang="scss" scoped>
.time {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .time-text {
    span {
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    span.active {
      color: #cb3737;
    }
  }
  .block {
    width: 40%;
  }
}
</style>
