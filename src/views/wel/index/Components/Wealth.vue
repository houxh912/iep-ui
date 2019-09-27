<template>
  <wrapper title="我的财富">
    <template v-slot:left>
      <span class="show-money" @click="handleShowMoney">
        <a-icon class="eye-btn" :type="showMoneyIcon" />
      </span>
    </template>
    <template v-slot:right>
      <div class="tip-wrapper">
        <div class="tip-line" @click="$openPage('/app/resource/material/material_detail/7971')">挖贝攻略<span><i class="el-icon-question"></i></span></div>
        <div class="tip-line">投资宝典<span><i class="el-icon-question"></i></span></div>
      </div>
    </template>
    <div class="wealth-wrapper">
      <div v-if="accountType === 0" class="data-wrapper">
        <div class="item total">
          <div class="title">总资产</div>
          <div class="color">{{displayTotalAsset}}</div>
        </div>
        <div class="item change">
          <div class="title">今日变化</div>
          <div class="color">{{displayTodayChange}}</div>
        </div>
      </div>
      <div v-if="accountType === 1" class="no-data-wrapper">
        <iep-button @click="handleOpenAccount('开通账户并提取1000国脉贝')" round>开通账户并提取1000国脉贝</iep-button>
      </div>
      <div v-if="accountType === 2" class="no-data-wrapper">
        <iep-button @click="handleOpenAccount('提取1000国脉贝')" round>提取1000国脉贝</iep-button>
      </div>
      <operation-wrapper>
        <iep-button @click="handleInvoice" plain>报销</iep-button>
        <iep-button @click="handleReward" plain>打赏</iep-button>
        <iep-button @click="$openPage('/wel/wealth/investment')" plain>投资</iep-button>
        <iep-button @click="$openPage('/wel/wealth/mutual_fund')" plain>互助基金</iep-button>
      </operation-wrapper>
    </div>
  </wrapper>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Wrapper from './Wrapper'
import { openAccount } from '@/api/fams/total'
export default {
  components: {
    Wrapper,
  },
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
    showMoneyIcon () {
      return this.showMoney ? 'eye' : 'eye-invisible'
    },
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
    handleShowMoney () {
      this.setShowMoney(!this.showMoney)
    },
    handleReward () {
      this.famsReward()
    },
    handleInvoice () {
      this.setInvoiceDialogShow(true)
    },
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
  },
}
</script>

<style lang="scss" scoped>
.show-money {
  cursor: pointer;
}
.tip-wrapper {
  display: flex;
}
.wealth-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  .data-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    width: 100%;
    .item {
      width: 100%;
      text-align: center;
      &:first-child {
        border-right: 1px solid #eee;
      }
      .color {
        font-size: 20px;
        color: $--color-primary;
      }
    }
  }
}
</style>
