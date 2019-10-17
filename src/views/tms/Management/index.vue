<template>
  <div>
    <basic-container>
      <total-wrapper :dataMap="financialData"></total-wrapper>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import { getMySharesValue } from '@/api/fams/investment'
import ClusteringResult from './ClusteringResult/'
import ClassificationRecord from './ClassificationRecord/'
import PeopleManagement from './PeopleManagement/'
import TotalWrapper from './TotalWrapper'
export default {
  components: {
    ClusteringResult,
    ClassificationRecord,
    PeopleManagement,
    TotalWrapper,
  },
  data () {
    return {
      statistics: [0, 0, 0, 0, 0, 0],
      tabList: [
        {
          label: '聚类结果',
          value: 'ClusteringResult',
        },
        {
          label: '归类记录',
          value: 'ClassificationRecord',
        },
        {
          label: '人工管理记录',
          value: 'PeopleManagement',
        },
      ],
      activeTab: 'ClusteringResult',
    }
  },
  computed: {
    financialData () {
      return {
        '中心词': this.statistics[0],
        '游离词': this.statistics[1],
        '卫星词': this.statistics[2],
        '阀值': this.statistics[3],
        '基础标签库': this.statistics[4],
        '聚类次数': this.statistics[5],
        '归类次数': this.statistics[5],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    // judgeSN (value) {
    //   if (typeof (value) === 'number') {
    //     return this.$options.filters.parseToM(value)
    //   } else {
    //     return value
    //   }
    // },
    syncRefresh () {
      this.loadPage()
      this.$refs['tabList'].loadPage()
    },
    loadPage () {
      getMySharesValue(this.id).then(({ data }) => {
        this.statistics = this.$fillStatisticsArray(this.statistics, data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>

