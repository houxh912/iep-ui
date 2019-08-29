<template>
  <div>
    <basic-container>
      <iep-statistics-header :title="form.orgName" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button type="primary" @click="handleChangeRelease" plain>变更发行</iep-button>
            <iep-button @click="$openPage(`/fams_spa/business_indicator`)">变更股东</iep-button>
            <iep-button @click="onGoBack">返回</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-if="activeTab ==='ReleaseRecord'" v-slot:ReleaseRecord>
          <release-record v-loading="activeTab !=='ReleaseRecord'"></release-record>
        </template>
        <template v-if="activeTab ==='TransactionRecord'" v-slot:TransactionRecord>
          <transaction-record v-loading="activeTab !=='TransactionRecord'"></transaction-record>
        </template>
        <template v-if="activeTab ==='ShareholderInformation'" v-slot:ShareholderInformation>
          <shareholder-information v-loading="activeTab !=='ShareholderInformation'"></shareholder-information>
        </template>
        <template v-if="activeTab ==='EquityStructure'" v-slot:EquityStructure>
          <equity-structure v-loading="activeTab !=='EquityStructure'"></equity-structure>
        </template>
      </iep-tabs>
    </basic-container>
    <change-release-form ref="ChangeReleaseForm" @load-page="loadPage"></change-release-form>
  </div>
</template>
<script>
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
import { getInvestmentById, getShareStatistics, changeRelease } from '@/api/fams/investment'
import ChangeReleaseForm from './ChangeReleaseForm'
import { initInvestmentForm } from './options'
import ReleaseRecord from './ReleaseRecord/'
import EquityStructure from './EquityStructure/'
import TransactionRecord from './TransactionRecord/'
import ShareholderInformation from './ShareholderInformation/'
export default {
  components: {
    IepStatisticsHeader,
    ReleaseRecord,
    TransactionRecord,
    ShareholderInformation,
    EquityStructure,
    ChangeReleaseForm,
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
          label: '发行记录',
          value: 'ReleaseRecord',
        },
        {
          label: '交易记录',
          value: 'TransactionRecord',
        },
        {
          label: '股东信息',
          value: 'ShareholderInformation',
        },
        {
          label: '股本结构',
          value: 'EquityStructure',
        },
      ],
      activeTab: 'ReleaseRecord',
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
    handleChangeRelease () {
      this.$refs['ChangeReleaseForm'].form = this.$refs['ChangeReleaseForm'].initForm(this.id)
      this.$refs['ChangeReleaseForm'].formRequestFn = changeRelease
      this.$refs['ChangeReleaseForm'].dialogShow = true
    },
    loadPage () {
      getInvestmentById(this.id).then(({ data }) => {
        this.form = data.data
      })
      getShareStatistics(this.id).then(({ data }) => {
        this.statistics = data.data
      })
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
  },
}
</script>
