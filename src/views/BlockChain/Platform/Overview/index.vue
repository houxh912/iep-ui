<template>
  <div>
    <basic-container>
      <iep-statistics-header title="平台账户概览" :dataMap="financialData">
        <template slot="right">
          <iep-button @click="handleTransfer">转账</iep-button>
        </template>
      </iep-statistics-header>
    </basic-container>
    <transfer-dialog ref="TransferDialog" :pay-type="1" @load-page="loadPage"></transfer-dialog>
  </div>
</template>
<script>
import { getPlatformAccount } from '@/api/fams/block_chain'
import TransferDialog from '@/views/BlockChain/Components/TransferDialog.vue'
export default {
  components: {
    TransferDialog,
  },
  data () {
    return {
      statistics: [0, 0, 0, 0],
    }
  },
  computed: {
    financialData () {
      return {
        '发币': this.statistics[0],
        '账户余额': this.statistics[1],
        '累积收入': this.statistics[2],
        '累积支出': this.statistics[3],
      }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleTransfer () {
      this.$refs['TransferDialog'].realMaxAmount = this.statistics[1]
      this.$refs['TransferDialog'].dialogShow = true
    },
    async loadPage () {
      const { data } = await getPlatformAccount()
      this.$set(this, 'statistics', [0, data.data, 0, 0])
    },
  },
}
</script>
