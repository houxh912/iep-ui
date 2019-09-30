<template>
  <div>
    <basic-container>
      <iep-statistics-header title="能贝账户" :dataMap="financialData">
        <template slot="right">
          <iep-button @click="handleTransfer">转账</iep-button>
        </template>
      </iep-statistics-header>
    </basic-container>
    <transfer-dialog ref="TransferDialog" :pay-type="4" @load-page="loadPage"></transfer-dialog>
  </div>
</template>
<script>
import { getAmount } from '@/api/fams/block_chain'
import TransferDialog from '@/views/BlockChain/Components/TransferDialog.vue'
export default {
  components: {
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
      const { data } = await getAmount()
      this.$set(this, 'statistics', [data.data])
    },
  },
}
</script>
