<template>
  <div>
    <basic-container>
      <iep-statistics-header title="我的投资" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button v-if="form.status === 1" @click="$openPage(`/fams_spa/change_shareholder/${id}`)">变更股东</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
// import { getShareStatistics } from '@/api/fams/investment'
import { initInvestmentForm } from './options'
import Position from './Position/'
import TransactionRecord from './TransactionRecord/'
export default {
  components: {
    IepStatisticsHeader,
    Position,
    TransactionRecord,
  },
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initInvestmentForm(),
      statistics: [0, 0, 0, 0],
      tabList: [
        {
          label: '持仓',
          value: 'Position',
        },
        {
          label: '交易记录',
          value: 'TransactionRecord',
        },
      ],
      activeTab: 'Position',
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
    methodName () {
      return this.id ? '编辑' : '新增'
    },
    financialData () {
      return {
        '发行股份': this.statistics[0],
        '已认购股份': this.statistics[1],
        '股东人数': this.statistics[2],
        '今日股价': this.statistics[3],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    syncRefresh () {
      this.loadPage()
      this.$refs['tabList'].loadPage()
    },
    loadPage () {
      // getShareStatistics(this.id).then(({ data }) => {
      //   this.statistics = data.data
      // })
    },
  },
}
</script>
