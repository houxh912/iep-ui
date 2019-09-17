<template>
  <div>
    <basic-container>
      <iep-page-header title="总体统计"></iep-page-header>

      <div class="top">
        <div class="box-border">
          <div class="box-list" :class="bian[index]" v-for="(item, index) in dataList" :key="index">
            <el-row>
              <div class="box" :class="bia[index]">
                <el-col :span="10">
                  <div class="image">
                    <img :src="item.img" alt>
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-col :span="12" class="des">
                    <div class="title">{{item.title}}</div>
                    <div class="num">{{item.count}}</div>
                  </el-col>
                </el-col>
              </div>
            </el-row>
          </div>
        </div>
      </div>

      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='WeekStatistics'" v-slot:WeekStatistics>
          <week-statistics></week-statistics>
        </template>
        <template v-if="activeTab ==='MonthStatistics'" v-slot:MonthStatistics>
          <month-statistics></month-statistics>
        </template>
        <template v-if="activeTab ==='YearStatistics'" v-slot:YearStatistics>
          <year-statistics></year-statistics>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>

<script>
import WeekStatistics from './weekStatistics'
import MonthStatistics from './monthStatistics'
import YearStatistics from './yearStatistics.vue'
import { getTotal } from '@/api/exam/testStatistics/totalStatistics'
export default {
  components: { WeekStatistics, MonthStatistics, YearStatistics },
  data () {
    return {
      tabName: 'statisticsTab',
      bian: ['bian1', 'bian2', 'bian3', 'bian4', 'bian5', 'bian6'],
      bia: ['bi1', 'bi2', 'bi3', 'bi4', 'bi5', 'bi6'],
      dataList: [
        { img: require('./img/1.png'), title: '累计考试次数', count: 0 },
        { img: require('./img/2.png'), title: '累计考试人数', count: 0 },
        { img: require('./img/3.png'), title: '人均考试次数', count: 0 },
        { img: require('./img/4.png'), title: '试题数量', count: 0 },
        { img: require('./img/5.png'), title: '试卷数量', count: 0 },
        { img: require('./img/6.png'), title: '证书库数量', count: 0 },
      ],
      tabList: [{
        label: '周统计',
        value: 'WeekStatistics',
      }, {
        label: '月统计',
        value: 'MonthStatistics',
      }, {
        label: '年统计',
        value: 'YearStatistics',
      }],
      activeTab: 'WeekStatistics',
      resData: {},
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      getTotal().then(res => {
        this.resData = res.data.data
        this.dataList[0].count = this.resData.examSum
        this.dataList[1].count = this.resData.examPeopleSum
        this.dataList[2].count = this.resData.PeopleAvg
        this.dataList[3].count = this.resData.itemBankSum
        this.dataList[4].count = this.resData.testPaperSum
        this.dataList[5].count = this.resData.certificateSum
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  height: 140px;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #e4e4e4;
  background-color: #fafafa;
  .box-border {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .box-list {
      height: 100%;
      .box {
        .image {
          width: 32px;
          height: 32px;
          float: right;
          margin-top: 5px;
          margin-right: 5px;
          img {
            width: 32px;
            height: 32px;
          }
        }
        .des {
          text-align: center;
          font-family: "Arial Normal", "Arial";
          color: #333333;
          .title {
            font-size: 14px;
            line-height: 20px;
          }
          .num {
            font-size: 18px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .bian1,
  .bian2,
  .bian4,
  .bian5 {
    border-right: 1px solid #e4e4e4;
  }
  .bi4,
  .bi5,
  .bi6 {
    margin-top: 15px;
  }
}
</style>