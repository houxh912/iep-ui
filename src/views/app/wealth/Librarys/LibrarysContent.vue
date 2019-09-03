<template>
  <div class="librarys-content">

    <div class="bottom">
      <span v-for="(item,index) in titleList" :key="index">{{item}}</span>
    </div>
    <div v-if="dataList.length !== 0">
      <div class="content-page">
        <div v-for="(item,index) in dataList" :key="index" class="piece">
          <a-skeleton :loading="loading" active />
          <div v-if="!loading" class="lie" @click="handleOpen(item)">
            <div class="box">
              <iep-img style="width: 50px;height:50px;float:left;" :src="item.orgLogo" alt=""></iep-img>
              <span style="float:left;margin-left:10px;">{{item.orgName}}</span>
            </div>
            <div class="box">{{item.todayPrice}}</div>
            <div class="box">
              <span :class="item.dailyGain>0&&!item.dailyGainInitial?'red':'green'">{{item.dailyGain==0||item.dailyGainInitial?'-':Math.round(item.dailyGain/item.yesterdayPrice * 10000) / 100 + '%'}}</span>
              <i v-if="item.dailyGain<0&&!item.dailyGainInitial" class="iconfont icon-xiadie green"></i>
              <i v-else-if="item.dailyGain>0&&!item.dailyGainInitial" class="iconfont icon-shangzhang red"></i>
            </div>
            <div class="box">
              <span :class="item.weekGain>0&&!item.weekGainInitial?'red':'green'">{{item.weekGain==0||item.weekGainInitial?'-':Math.round(item.weekGain/item.lastWeekPrice * 10000) / 100 + '%'}}</span>
              <i v-if="item.weekGain<0&&!item.weekGainInitial" class="iconfont icon-xiadie green"></i>
              <i v-else-if="item.weekGain>0&&!item.weekGainInitial" class="iconfont icon-shangzhang red"></i>
            </div>
            <div class="box">
              <span :class="item.monthGain>0&&!item.monthGainInitial?'red':'green'">{{item.monthGain==0||item.monthGainInitial?'-':Math.round(item.monthGain/item.lastMonthPrice * 10000) / 100 + '%'}}</span>
              <i v-if="item.monthGain<0&&!item.monthGainInitial" class="iconfont icon-xiadie green"></i>
              <i v-else-if="item.monthGain>0&&!item.monthGainInitial" class="iconfont icon-shangzhang red"></i>
            </div>
            <div class="box">
              <span :class="item.marchGain>0&&!item.marchGainInitial?'red':'green'">{{item.marchGain==0||item.marchGainInitial?'-':Math.round(item.marchGain/item.threeMonthPrice * 10000) / 100 + '%'}}</span>
              <i v-if="item.marchGain<0&&!item.marchGainInitial" class="iconfont icon-xiadie green"></i>
              <i v-else-if="item.marchGain>0&&!item.marchGainInitial" class="iconfont icon-shangzhang red"></i>
            </div>
            <!-- <div class="box">
              <span class="">{{item.yearGain}}</span>
              <i class="iconfont icon-xiadie"></i>
              <i class="iconfont icon-shangzhang"></i>
            </div> -->
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
import { getInvestmentPage } from '@/api/fams/investment'
function initDataItem () {
  return {
    orgName: '',
    todayPrice: '',
    investmentNumber: '',
    createTime: '',
    dailyGain: '-',
    weekGain: '-',
    monthGain: '-',
    marchGain: '-',
    // yearGain: '-',
  }
}
export default {
  data () {
    const dataList = []
    for (let i = 0; i < 10; i++) {
      dataList.push(initDataItem())
    }
    return {
      loading: true,
      dataList,
      secondClass: '',
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
        status: 3,
        type: 1,
      },
      titleList: ['组织名称', '今日股价', '日涨幅', '近一周涨幅', '近一月涨幅', '近三月涨幅'],
    }
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/wealth/wealth_details/${row.id}`,
      })
    },
    loadPage () {
      this.loading = true
      getInvestmentPage(Object.assign({}, this.paramForm, this.params)).then(({ data }) => {
        this.dataList = data.data.records.map(m => {
          return {
            ...m,
            dailyGain: m.todayPrice - m.yesterdayPrice,
            dailyGainInitial: m.yesterdayPrice == 0 ? true : false,
            weekGain: m.todayPrice - m.lastWeekPrice,
            weekGainInitial: m.lastWeekPrice == 0 ? true : false,
            monthGain: m.todayPrice - m.lastMonthPrice,
            monthGainInitial: m.lastMonthPrice == 0 ? true : false,
            marchGain: m.todayPrice - m.threeMonthPrice,
            marchGainInitial: m.threeMonthPrice == 0 ? true : false,
          }
        })
        console.log(this.dataList)
        // for (let i in this.dataList) {
        //   if (i > 0) {
        //     this.trendCharts[i]['涨跌额'] = this.trendCharts[i]['股价走势'] - this.trendCharts[i - 1]['股价走势']
        //   }
        // }
        this.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.content-page {
  min-height: 320px;
}
.bottom {
  width: 100%;
  height: 60px;
  padding-top: 20px;
  border-bottom: 1px solid #f5f5f5;
  // background: rgb(242, 244, 245);
  display: grid;
  grid-auto-flow: row dense;
  // grid-row-gap: 10px;
  // grid-column-gap: 10px;
  grid-template-columns:
    minmax(100px, 3fr) minmax(100px, 1fr) minmax(100px, 1fr)
    minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
  > span {
    text-align: center;
  }
  > span:first-child {
    text-align: left;
  }
}
.piece {
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
  .lie {
    cursor: pointer;
    display: grid;
    grid-auto-flow: row dense;
    // grid-row-gap: 10px;
    // grid-column-gap: 10px;
    grid-template-columns:
      minmax(100px, 3fr) minmax(100px, 1fr) minmax(100px, 1fr)
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    .box {
      text-align: center;
      height: 50px;
      line-height: 50px;
      .red {
        color: red;
      }
      .green {
        color: green;
      }
    }
    .box:first-child {
      text-align: left;
    }
  }

  &:hover {
    background-color: #f5f5f5;
  }
  // & > p {
  //   font-size: 14px;
  //   color: #666;
  //   line-height: 28px;
  // }
}
// .title {
//   .name {
//     display: inline-block;
//     height: 50px;
//     line-height: 50px;
//     margin-right: 10px;
//     font-size: 16px;
//     color: #333;
//     transition: 0.5s;
//     &:hover {
//       color: #cb3737;
//     }
//   }
//   i {
//     margin-right: 10px;
//     font-size: 22px;
//     color: #aaa;
//     vertical-align: -2px;
//   }
// }
// .box {
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   span {
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     margin-right: 20px;
//     line-height: 24px;
//     color: #aaa;
//     i {
//       margin-right: 5px;
//       font-size: 16px;
//       color: #aaa;
//       vertical-align: -2px;
//     }
//   }
// }
</style>
