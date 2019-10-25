<template>
  <div class="treasure">
    <div class="title">
      <div class="flex">我的财富</div>
    </div>
    <div class="treasure-data">
      <div class="total">
        <div class="little-title">能贝</div>
        <div class="color">{{displayTotalAsset}}</div>
      </div>
      <span class="right-top" @click="handleShowMoney">
        <a-icon class="eye-btn" :type="showMoneyIcon" />
      </span>
    </div>
    <el-button-group class="operation-btn-group">
      <iep-button @click="handleTransfer" plain>打赏</iep-button>
    </el-button-group>
    <transfer-dialog ref="TransferDialog" :pay-type="4" @load-page="loadPage"></transfer-dialog>
  </div>
</template>
<script>
import TransferDialog from '@/views/BlockChain/Components/TransferDialog.vue'
import { mapGetters, mapMutations } from 'vuex'
import { getAmount } from '@/api/fams/block_chain'
export default {
  components: {
    TransferDialog,
  },
  data () {
    return {
      totalAsset: 0,
    }
  },
  computed: {
    ...mapGetters(['showMoney']),
    displayTotalAsset () {
      let { totalAsset } = this
      totalAsset = totalAsset.toFixed(2)
      return this.showMoney ? totalAsset : '****'
    },
    showMoneyIcon () {
      return this.showMoney ? 'eye' : 'eye-invisible'
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    ...mapMutations({
      setShowMoney: 'SET_SHOWMONEY',
    }),
    async loadPage () {
      const { data } = await getAmount()
      this.totalAsset = data.data
    },
    handleShowMoney () {
      this.setShowMoney(!this.showMoney)
    },
    ...mapMutations({
      setInvoiceDialogShow: 'SET_INVOICE_DIALOG_SHOW',
    }),
    handleTransfer () {
      this.$refs['TransferDialog'].realMaxAmount = this.totalAsset
      this.$refs['TransferDialog'].dialogShow = true
    },
  },
}
</script>
<style lang="scss" scoped>
.treasure {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 10px 5px;
  .el-icon-question {
    &:hover {
      opacity: 0.7;
    }
  }
}
.title {
  width: 100%;
  display: flex;
  padding: 0 0 10px 0;
  font-size: 16px;
  font-weight: 500;
  .flex {
    flex-grow: 1;
    margin-right: 5px;
    width: auto;
  }
  .line {
    padding-right: 5px;
    color: #e0e0e0;
  }
  .small {
    font-size: 13px;
    padding-top: 4px;
    color: #686868;
    line-height: 16px;
    cursor: pointer;
    position: relative;
    &:hover {
      color: $--menu-color-primary;
    }
    span {
      color: #bbb;
    }
  }
}
.operation-btn-group {
  margin: 10px 0;
  .el-button {
    height: 30px;
    padding: 0 15px;
  }
}
.no-treasure-data {
  display: flex;
  height: 90px;
  width: 230px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #f3f3f3;
  padding: 15px 0;
}
.treasure-data {
  padding: 15px 0;
  background: white;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e8e8e8;
  position: relative;
  overflow: hidden;
  width: 100%;
  .right-top {
    cursor: pointer;
    display: inline-block;
    width: 45px;
    height: 45px;
    background: #f4f4f4;
    position: absolute;
    top: -23px;
    right: -22px;
    z-index: 98;
    transform: rotate(225deg);
    &:hover {
      background: #e0e0e0;
    }
    i {
      transform: rotate(-225deg);
      color: #999;
    }
  }
  > div {
    display: inline-block;
    height: auto;
    width: 50%;
  }
  .total {
    position: relative;
  }
  .little-title {
    padding-bottom: 10px;
    color: #959595;
  }
  .color {
    color: $--color-primary;
    font-size: 20px;
  }
}
</style>
