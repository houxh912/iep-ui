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
    <customerDetail ref="detail"></customerDetail>
    <div class="piece">
      <IepAppTabCard :title="labelTitle">
        <IepAppListCard :dataList="labelList" name="positionName" @click="handleDetail"></IepAppListCard>
      </IepAppTabCard>
    </div>
  </div>
</template>
<script>
import customerDetail from './detail/'
import { getPostList } from '@/api/app/hrms/'

export default {
  components: {
    customerDetail,
  },
  data () {
    return {
      labelTitle: '推荐岗位',
      labelList: [],
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$nextTick(() => {
      this.$refs['detail'].loadPage()
    })
    next()
  },
  methods: {
    // 推荐岗位
    getRectagsList () {
      getPostList().then(({data}) => {
        this.labelList = data.data
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/recruitDetail/${row.id}`)
    },
  },
  created () {
    this.getRectagsList()
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
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
  .piece {
    .name {
      width: 100%!important;
    }
  }
}
.el-card {
  border: 0;
}
.library {
  padding-right: 20px;
  border-right: 1px solid #ebeef5;
}
</style>
<style scoped>
.breadcrumb-wrapper >>> .el-breadcrumb__inner.is-link {
  font-weight: normal;
}
</style>
