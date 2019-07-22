<template>
  <div class="client-detail">
    <!-- <div class="library">
      <div class="client-top">
        <p>{{title}}</p>
        <span>市场经理：{{name[0]}}</span>
        <span>协助人：{{name[1]}}</span>
      </div>
      <customer></customer>
    </div> -->
    <customerDetail :formData="formData"></customerDetail>
    <div class="piece">
      <IepAppTabCard :title="labelTitle">
        <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
      </IepAppTabCard>
      <IepAppTabCard :title="listTitle1">
        <IepAppListCard :dataList="listList1" name="clientName" @click="weekClientDetail"></IepAppListCard>
      </IepAppTabCard>
      <IepAppTabCard :title="rankingTitle">
        <IepAppRankingCard :dataList="dataList" name="clientName" @click="coopClientDetail"></IepAppRankingCard>
      </IepAppTabCard>
    </div>
  </div>
</template>
<script>
import customerDetail from './Customer/'
import { getCustomerById } from '@/api/crms/customer'
import { getRectagsList } from '@/api/app/tms/index'
import { getNewClientList, getCoopClientList } from '@/api/app/crms/'

export default {
  components: {
    // Customer,
    customerDetail,
  },
  data () {
    return {
      title: '厦门市信息中心标准规划部',
      name: ['李凯', '胡浩'],
      labelTitle: '热门标签',
      listTitle1: '本周新增',
      rankingTitle: '合作次数最多',
      labelList: [],
      listList1: [],
      dataList: [],
      formData: {},
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.getCustomerById(this.$route.params.id)
    })
    next()
  },
  methods: {
    getCustomerById (id) {
      getCustomerById(id).then(({ data }) => {
        this.formData = data.data
      })
    },
    // 推荐主题
    getRectagsList () {
      getRectagsList().then(({ data }) => {
        this.labelList = data.data
      })
    },
    // 合作次数最多
    getCoopClientList () {
      getCoopClientList().then(({ data }) => {
        // 存在偶尔可能数据为null的情况
        let row = data.data
        for (let i = 0; i < row.length; ++i) {
          if (row[i] == null) {
            row[i] = {}
          }
          if (i < 3) {
            row[i].color = 'red'
          }
        }
        this.dataList = row
      })
    },
    coopClientDetail (row) {
      this.$router.push(`/app/resource/client/client_detail/${row.clientId}`)
    },
    // 本周新增
    getNewClientList () {
      getNewClientList().then(({ data }) => {
        this.listList1 = data.data
      })
    },
    weekClientDetail (row) {
      this.$router.push(`/app/resource/client/client_detail/${row.clientId}`)
    },
  },
  created () {
    let params = this.$route.params
    this.getCustomerById(params.id)
    this.getRectagsList()
    this.getCoopClientList()
    this.getNewClientList()
  },
}
</script>
<style lang="scss" scoped>
.client-top {
  margin-bottom: 15px;
  p {
    color: #333;
    font-size: 18px;
    margin-bottom: 8px;
  }
  span {
    margin-right: 10px;
    font-size: 14px;
  }
}
.client-detail {
  width: 1200px;
  margin: 0 auto 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 30px;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
  .piece {
    &:nth-child(1) {
      margin-top: -7px;
    }
    .name {
      width: 100% !important;
    }
  }
}
.el-card {
  border: 0;
  padding: 0 !important;
}
.library {
  padding-right: 30px;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
.client-detail >>> .el-card {
  padding: 0 !important;
}
</style>
