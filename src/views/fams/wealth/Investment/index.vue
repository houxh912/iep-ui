<template>
  <div>
    <basic-container>
      <iep-page-header title="我的投资"></iep-page-header>
      <div class="grid-container">
        <div class="grid-item-1-3">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div slot="header" class="clearfix">
              <h2>投资指数</h2>
            </div>
            <my-data></my-data>
            <div class="flex-aroud">
              <iep-button size="default">我的投资</iep-button>
              <iep-button size="default">投资凭证</iep-button>
              <iep-button size="default">收益统计</iep-button>
            </div>
          </el-card>
        </div>
        <div class="grid-item-1">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div class="total-wrapper">
              <div class="total-item" v-for="(item, index) in financialData" :key="index">
                <div class="value">{{item | parseToMoney}}</div>
                <div class="label"><a href="#">{{index}}</a></div>
              </div>
            </div>
          </el-card>
        </div>
        <div class="grid-item-2">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div slot="header" class="clearfix">
              <h2>我要投资</h2>
            </div>
            <div class="flex-aroud">
              <iep-button size="default">我的投资</iep-button>
              <iep-button size="default">投资凭证</iep-button>
              <iep-button size="default">收益统计</iep-button>
            </div>
          </el-card>
        </div>
        <div class="gird-item-3">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div slot="header" class="clearfix">
              <h2>我的投资</h2>
            </div>
            <my-investment></my-investment>
          </el-card>
        </div>
        <div class="grid-item-4">
          <el-card shadow="never" class="box-card" :body-style="bodyStyle">
            <div slot="header" class="clearfix">
              <h2>推荐投资</h2>
            </div>
            <recommend></recommend>
          </el-card>
        </div>
      </div>
    </basic-container>
  </div>
</template>
<script>
import { getInvestmentPersonPage, getMyPerson } from '@/api/fams/investment'
import MyData from './MyData'
import MyInvestment from './MyInvestment'
import Recommend from './Recommend'
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    prop: 'updateTime',
    label: '日期',
  },
  {
    prop: 'orgName',
    label: '投资组织',
  },
  {
    prop: 'status',
    label: '状态',
    type: 'dict',
  },
  {
    prop: 'remarks',
    label: '备注',
  },
]
const dictsMap = {
  status: {
    1: '待审核',
    2: '审核通过',
    3: '审核驳回',
  },
}
export default {
  components: { MyData, MyInvestment, Recommend },
  data () {
    return {
      pagination:{},
      pagedTable: [],
      columnsMap,
      dictsMap,
      bodyStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      financialData: {
        '投资金额': 0,
        '收益金额': 2,
        '投资排名': 59,
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  mixins:[mixins],
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param = this.searchForm) {
      this.loadTable({ status: this.status, ...param, userId: this.userInfo.userId }, getInvestmentPersonPage)
      getMyPerson().then(({ data }) => {
        this.financialData['投资金额'] = data.data
      })
    },
    handleDetail (row) {
      this.$router.push({
        path: `/app/wealth/wealth_details/${row.investmentId}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.box-card {
  height: 100%;
}
.flex-aroud {
  display: flex;
  justify-content: space-around;
}
.total-wrapper {
  display: flex;
  justify-content: space-around;
  margin: 14px 0;
  .total-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgb(233, 233, 233);
    width: 100%;
    &:last-child {
      border-right: none;
    }
    .value {
      font-size: 24px;
      color: rgb(48, 49, 51);
    }
    .label {
      & > a {
        color: #999;
      }
    }
  }
}
.grid-container {
  display: grid;
  grid-template-columns: 55fr 28fr;
  grid-template-rows: 1fr 3fr 3fr;
  grid-template-areas: "grid-item-1 grid-item-2" "gird-item-3 grid-item-1-3" "grid-item-4 grid-item-1-3";
  // height: calc(100vh - 150px);
  grid-gap: 25px;
  .grid-item-1-3 {
    grid-area: grid-item-1-3;
  }
  .grid-item-1 {
    grid-area: grid-item-1;
  }
  .grid-item-2 {
    grid-area: grid-item-2;
  }
  .gird-item-3 {
    grid-area: gird-item-3;
  }
  .grid-item-4 {
    grid-area: grid-item-4;
  }
}
</style>
