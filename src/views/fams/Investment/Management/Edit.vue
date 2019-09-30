<template>
  <div>
    <basic-container>
      <iep-statistics-header :title="form.orgName" :dataMap="financialData">
        <template slot="right">
          <operation-wrapper>
            <iep-button v-if="form.status === 1" type="primary" @click="handleChangeRelease" plain>变更发行</iep-button>
            <iep-button v-if="form.status === 1" @click="$openPage(`/fams_spa/change_shareholder/${id}`)">变更股东</iep-button>
            <iep-button @click="onGoBack">返回</iep-button>
          </operation-wrapper>
        </template>
      </iep-statistics-header>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-slot:[activeTab]>
          <component ref="tabList" :is="activeTab"></component>
        </template>
      </iep-tabs>
    </basic-container>
    <change-release-form ref="ChangeReleaseForm" @load-page="syncRefresh"></change-release-form>
  </div>
</template>
<script>
import { getInvestmentById, getShareStatistics, changeRelease } from '@/api/fams/investment'
import ChangeReleaseForm from './ChangeReleaseForm'
import { initInvestmentForm } from './options'
import ReleaseRecord from './ReleaseRecord/'
import EquityStructure from './EquityStructure/'
import TransactionRecord from './TransactionRecord/'
import ShareholderInformation from './ShareholderInformation/'
export default {
  components: {
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
        '总股本': this.statistics[0],
        '发行股份': this.statistics[1],
        '已认购股份': this.statistics[2],
        '股东人数': this.statistics[3],
        '今日股价': this.statistics[4],
        '募集金额': this.statistics[5],
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
    syncRefresh () {
      this.loadPage()
      this.$refs['tabList'].loadPage()
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
