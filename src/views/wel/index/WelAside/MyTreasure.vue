<template>
  <div class="treasure">
    <div class="title">
      <div class="flex">我的财富</div>
      <div class="flex small" @click="handleOpen()">挖贝攻略<span><i class="el-icon-question"></i></span></div>
      <div class="line">|</div>
      <div class="flex small">投资宝典<span><i class="el-icon-question"></i></span></div>
    </div>
    <div v-if="accountType === 0" class="treasure-data">
      <div class="total">
        <div class="little-title">总资产</div>
        <div class="color">{{displayTotalAsset}}</div>
      </div>
      <div class="change">
        <div class="little-title">今日变化</div>
        <div class="color">{{displayTodayChange}}</div>
      </div>
      <span class="right-top" @click="handleShowMoney">
        <a-icon class="eye-btn" :type="showMoneyIcon" />
      </span>
    </div>
    <div v-if="accountType === 1" class="no-treasure-data">
      <el-button @click="handleOpenAccount('开通账户并提取1000国脉贝')" round>开通账户并提取1000国脉贝</el-button>
    </div>
    <div v-if="accountType === 2" class="no-treasure-data">
      <el-button @click="handleOpenAccount('提取1000国脉贝')" round>提取1000国脉贝</el-button>
    </div>
    <el-button-group class="operation-btn-group">
      <iep-button @click="handleInvoice" plain>报销</iep-button>
      <iep-button @click="handleReward" plain>打赏</iep-button>
      <iep-button @click="$openPage('/wel/wealth/investment')" plain>投资</iep-button>
      <iep-button @click="$openPage('/wel/wealth/mutual_fund')" plain>互助基金</iep-button>
    </el-button-group>
  </div>
</template>
<script>
// import { addBellBalanceRule } from '@/api/fams/balance_rule'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
import { openAccount } from '@/api/fams/total'
export default {
  data () {
    return {
      accountType: 0,
    }
  },
  computed: {
    ...mapState({
      totalAsset: state => state.fams.totalAsset,
      dayBell: state => state.fams.dayBell,
    }),
    ...mapGetters(['showMoney']),
    displayTotalAsset () {
      let { totalAsset } = this
      totalAsset = totalAsset.toFixed(2)
      return this.showMoney ? totalAsset : '****'
    },
    displayTodayChange () {
      let { dayBell } = this
      dayBell = dayBell.toFixed(2)
      return this.showMoney ? dayBell : '****'
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
      setInvoiceDialogShow: 'SET_INVOICE_DIALOG_SHOW',
      setShowMoney: 'SET_SHOWMONEY',
    }),
    ...mapActions(['famsReward', 'famsGetTotal']),
    async loadPage () {
      const data = await this.famsGetTotal()
      if (data.data) {
        this.accountType = 0
      } else {
        this.accountType = +data.msg
      }
    },
    async handleOpenAccount (msg) {
      this.$confirm(`确定${msg}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const loading = this.$loading({
          lock: true,
          text: '正在为您操作财富账户',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        const { data } = await openAccount()
        if (data.data) {
          setTimeout(() => {
            loading.close()
            this.loadPage()
          }, 2000)
        } else {
          this.$message('操作失败，请联系管理员')
        }

      }).catch(() => {
        this.$message('已取消操作')
      })

    },
    handleShowMoney () {
      this.setShowMoney(!this.showMoney)
    },
    handleOpen () {
      this.$openPage('/app/resource/material/material_detail/7971')
    },
    handleReward () {
      this.famsReward()
    },
    handleInvoice () {
      this.setInvoiceDialogShow(true)
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
  .total:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    background: #ccc;
    height: 100%;
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


