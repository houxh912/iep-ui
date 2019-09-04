<template>
  <div>
    <basic-container>
      <iep-statistics-header title="我的投资" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button @click="$openPage(`/fams_spa/change_shareholder/${id}`)">变更股东</iep-button>
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
import { getMySharesValue } from '@/api/fams/investment'
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
      statistics: [0, 0, 0, 0, 0, 0],
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
    financialData () {
      return {
        '总市值': this.statistics[0],
        '今日盈亏': this.statistics[1],
        '累计盈亏': this.statistics[2],
        '本金': this.statistics[3],
        '持有流通股本': this.statistics[4],
        '持有非流通股本': this.statistics[5],
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
      getMySharesValue(this.id).then(({ data }) => {
        this.statistics = data.data
      })
    },
  },
}
</script>
