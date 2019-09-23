<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header :title="form.projectName" :back-option="backOption">
      </iep-page-header>
      <el-card class="box-card" shadow="never" :body-style="{ display: 'flex' }">
        <div class="left-wrapper">
          <span>合同金额</span>
          <div class="content">￥{{form.contractAmount}}</div>
        </div>
        <div class="info">
          <div class="info-item">
            <label>创建人：</label>
            <iep-div-detail style="height:40px;line-height:40px;" :value="form.publisherList.name"></iep-div-detail>
          </div>
          <div class="info-item">
            <label>项目编号：</label>
            <div class="content">{{form.serialNo}}</div>
          </div>
          <div class="info-item">
            <label>项目经理：</label>
            <iep-div-detail style="height:40px;line-height:40px;" :value="form.projectManagerList.name"></iep-div-detail>
          </div>
          <div class="info-item">
            <label>市场经理：</label>
            <iep-div-detail style="height:40px;line-height:40px;" :value="form.mktManagerList.name"></iep-div-detail>
          </div>
          <div class="info-item">
            <label>立项时间：</label>
            <div class="content">{{form.projectTime | parseToDay}}</div>
          </div>
          <div class="info-item">
            <label>完结时间：</label>
            <div class="content">{{form.endTime | parseToDay}}</div>
          </div>
        </div>
      </el-card>
      <iep-tabs v-model="activeTab" :tab-list="tabList" style="margin-top:20px;">
        <template v-if="activeTab ==='Accounting'" v-slot:Accounting>
          <accounting v-loading="activeTab !=='Accounting'"></accounting>
        </template>
        <template v-if="activeTab ==='Cost'" v-slot:Cost>
          <cost v-loading="activeTab !=='Cost'"></cost>
        </template>
        <template v-if="activeTab ==='Payback'" v-slot:Payback>
          <payback v-loading="activeTab !=='Payback'"></payback>
        </template>
        <template v-if="activeTab ==='Budget'" v-slot:Budget>
          <budget v-loading="activeTab !=='Budget'"></budget>
        </template>
        <template v-if="activeTab ==='Invoiceing'" v-slot:Invoiceing>
          <invoiceing v-loading="activeTab !=='Invoiceing'"></invoiceing>
        </template>
      </iep-tabs>
    </basic-container>
  </div>
</template>
<script>
import { getProjectInformationById } from '@/api/fams/statistics'
import mixins from '@/mixins/mixins'
import { initDetailForm } from './options'
import Accounting from './Accounting/'
import Budget from './Budget/'
import Cost from './Cost/'
import Payback from './Payback/'
import Invoiceing from './Invoiceing/'
export default {
  components: { Accounting, Cost, Payback, Budget, Invoiceing },
  mixins: [mixins],
  data () {
    return {
      backOption: {
        isBack: true,
      },
      form: initDetailForm(),
      tabList: [
        {
          label: '项目核算表',
          value: 'Accounting',
        },
        {
          label: '项目费用表',
          value: 'Cost',
        },
        {
          label: '项目回款表',
          value: 'Payback',
        },
        {
          label: '项目回款计划',
          value: 'Budget',
        },
        {
          label: '项目开票表',
          value: 'Invoiceing',
        },
      ],
      activeTab: 'Accounting',
    }
  },
  computed: {
    id () {
      return +this.$route.params.id
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      if (this.id) {
        this.isLoadTable = true
        getProjectInformationById(this.id).then(({ data }) => {
          this.form = this.$mergeByFirst(initDetailForm(), data.data)
          this.isLoadTable = false
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.left-wrapper {
  flex: 1;
  text-align: center;
  > span {
    width: 100%;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    display: block;
    margin-top: 20px;
  }
  .content {
    font-size: 24px;
    color: $--color-primary;
  }
}
.info {
  flex: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  .info-item {
    & > label {
      width: 120px;
      text-align: right;
      vertical-align: middle;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .content {
      margin-left: 120px;
      line-height: 40px;
      position: relative;
      font-size: 14px;
    }
  }
}
</style>
