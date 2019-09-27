<template>
  <div>
    <basic-container>
      <iep-statistics-header title="平台账户" :dataMap="financialData">
        <template slot="right">
          <iep-button @click="handleTransfer">转账</iep-button>
        </template>
      </iep-statistics-header>
    </basic-container>
    <transfer-dialog ref="TransferDialog" :pay-type="3" @load-page="loadPage"></transfer-dialog>
  </div>
</template>
<script>
import { getOrgAccount } from '@/api/fams/block_chain'
import TransferDialog from '@/views/BlockChain/Components/TransferDialog.vue'
import IepStatisticsHeader from '@/views/fams/Components/StatisticsHeader'
export default {
  components: {
    IepStatisticsHeader,
    TransferDialog,
  },
  data () {
    return {
      statistics: [0],
    }
  },
  computed: {
    financialData () {
      return {
        '账户余额': this.statistics[0],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleTransfer () {
      this.$refs['TransferDialog'].realMaxAmount = this.statistics[0]
      this.$refs['TransferDialog'].dialogShow = true
    },
    async loadPage () {
      const { data } = await getOrgAccount()
      this.$set(this, 'statistics', [data.data])
    },
  },
}
</script>
