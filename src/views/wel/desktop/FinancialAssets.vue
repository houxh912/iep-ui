<template>
  <div>
    <div class="financial-assets">
      <el-card shadow="never">
        <h4 class="sub-title">总资产</h4>
        <div class="total-wrapper" v-if="!isAbled">
          <div class="total-item">
            <div class="sum">{{form.bankDeposit}}</div>
            <div class="name">银行存款</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.cashInStock}}</div>
            <div class="name">库存现金</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.groupContacts}}</div>
            <div class="name">集团往来</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.contractualReceive}}</div>
            <div class="name">合同应收账款</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.financing}}</div>
            <div class="name">融资</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.investment}}</div>
            <div class="name">投资</div>
          </div>
          <div class="total-item">
            <div class="sum">{{form.other}}</div>
            <div class="name">其他应收款</div>
          </div>
        </div>
        <div class="total-wrapper" v-else>
          <div class="total-item">
            <div class="sum">{{groupForm.circulation}}</div>
            <div class="name">发行量</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.balance}}</div>
            <div class="name">系统账户余额</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.expenditure}}</div>
            <div class="name">系统支出</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.income}}</div>
            <div class="name">系统收入</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.putForward}}</div>
            <div class="name">提现数</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.project}}</div>
            <div class="name">项目应收款</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.other}}</div>
            <div class="name">其他应收款</div>
          </div>
          <div class="total-item">
            <div class="sum">{{groupForm.borrow}}</div>
            <div class="name">组织拆借</div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getAssetsByDate,getGroupAssetsByDate } from '@/api/fams/statistics'
import {mapGetters} from 'vuex'
function initForm () {
  return {
    bankDeposit: '',
    cashInStock: '',
    groupContacts: '',
    contractualReceive: '',
    financing: '',
    investment: '',
    other: '',
  }
}
function initGroupForm () {
  return {
    circulation: '',
    balance: '',
    expenditure: '',
    income: '',
    putForward: '',
    project: '',
    other: '',
    borrow: '',
  }
}
export default {
  data () {
    return {
      form: initForm(),
      groupForm: initGroupForm(),
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    isAbled () {
      return this.userInfo.userId === 1 || this.userInfo.userId === 2 || this.userInfo.userId === 3
    },
  },
  methods: {
    async loadPage () {
      if(this.isAbled){
        const { data } = await getGroupAssetsByDate([])
        this.groupForm = this.$mergeByFirst(initGroupForm(), data.data)
      }else{
        const { data } = await getAssetsByDate([])
        this.form = this.$mergeByFirst(initForm(), data.data)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.financial-assets {
  .sub-title {
    margin-bottom: 20px;
    font-size: 16px;
  }
  .total-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .total-item {
      padding-right: 36px;
      text-align: center;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: 0;
      }
    }
    .sum {
      font-size: 24px;
    }
    .name {
      margin-top: 10px;
      color: #999;
    }
  }
}
</style>
