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
      <iep-button @click="handleReward" plain>打赏</iep-button>
    </el-button-group>
  </div>
</template>
<script>
// import { addBellBalanceRule } from '@/api/fams/balance_rule'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getAccountInfo } from '@/api/fams/block_chain'
export default {
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
      const { data } = await getAccountInfo()
      this.totalAsset = data.data.balance
    },
    handleShowMoney () {
      this.setShowMoney(!this.showMoney)
    },
    ...mapMutations({
      setInvoiceDialogShow: 'SET_INVOICE_DIALOG_SHOW',
    }),
    ...mapActions(['famsReward']),
    handleReward () {
      this.famsReward()
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
  padding: 10px 0;
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
    color: #cb132d;
    font-size: 20px;
  }
}
.cursor {
  cursor: pointer;
}
</style>
<style scoped>
.operation-btn-group >>> .el-button {
  height: 30px;
  padding: 0 13px;
}
</style>


