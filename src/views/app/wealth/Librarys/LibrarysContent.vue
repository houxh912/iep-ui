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
            <!-- <div class="title">
              <h4 class="name">{{item.orgName}}</h4>
            </div>
            <div class="box">
              <span>目标金额：{{item.targetAmount}}</span>
              <span>已投人数：{{item.investmentNumber}}</span>
              <span><i class="iconfont icon-shijian"></i>{{item.createTime}}</span>
            </div> -->
            <div class="box">
              <iep-img style="width: 50px;height:50px;float:left;" :src="item.orgLogo" alt=""></iep-img>
              <span style="float:left;margin-left:10px;">{{item.orgName}}</span>
            </div>
            <div class="box">{{item.targetAmount}}</div>
            <div class="box">
              <span :class="item.dailyGain>0?'red':'green'">{{item.dailyGain}}%</span>
              <i v-if="item.dailyGain<0" class="iconfont icon-xiadie"></i>
              <i v-else-if="item.dailyGain>0" class="iconfont icon-shangzhang"></i>
            </div>
            <div class="box">
              <span class="">{{item.weekGain}}%</span>
              <i class="iconfont icon-xiadie"></i>
              <i class="iconfont icon-shangzhang"></i>
            </div>
            <div class="box">
              <span class="">{{item.monthGain}}%</span>
              <i class="iconfont icon-xiadie"></i>
              <i class="iconfont icon-shangzhang"></i>
            </div>
            <div class="box">
              <span class="">{{item.marchGain}}%</span>
              <i class="iconfont icon-xiadie"></i>
              <i class="iconfont icon-shangzhang"></i>
            </div>
            <div class="box">
              <span class="">{{item.yearGain}}%</span>
              <i class="iconfont icon-xiadie"></i>
              <i class="iconfont icon-shangzhang"></i>
            </div>
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
    targetAmount: '',
    investmentNumber: '',
    createTime: '',
    dailyGain: '-',
    weekGain: '-',
    monthGain: '-',
    marchGain: '-',
    yearGain: '-',
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
      titleList: ['组织名称', '今日股价', '日涨幅', '近一周涨幅', '近一月涨幅', '近三月涨幅', '近半年涨幅'],
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
        this.dataList = data.data.records
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
    minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
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
      minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
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
