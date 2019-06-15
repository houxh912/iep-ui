<template>
  <div class="search">
    <searchTop :params="query.title" @search-page="loadPage"></searchTop>

    <div class="container">
      <iep-tabs v-model="activeTab" :tab-list="tabList">
      </iep-tabs>
    </div>

    <div class="main">
      <div class="library">
        <newsTab v-if="activeTab=='yw'" :title="query.title" ref="content"></newsTab>
        <projectTab v-if="activeTab=='xm'" :title="query.title" ref="content"></projectTab>
        <materialTab v-if="activeTab=='cl'" :title="query.title" ref="content"></materialTab>
        <trainTab v-if="activeTab=='px'" :title="query.title" ref="content"></trainTab>
        <contractTab v-if="activeTab=='ht'" :title="query.title" ref="content"></contractTab>
        <businessTab v-if="activeTab=='sj'" :title="query.title" ref="content"></businessTab>
        <userTab v-if="activeTab=='cy'" :title="query.title" ref="content"></userTab>
        <honorTab v-if="activeTab=='ryzz'" :title="query.title" ref="content"></honorTab>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle1">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <!-- <IepAppTabCard :title="labelTitle2">
          <IepAppLabelCard :dataList="labelList"></IepAppLabelCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle1">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard>
        <IepAppTabCard :title="listTitle2">
          <IepAppListCard :dataList="listList2" name="materialName"></IepAppListCard>
        </IepAppTabCard> -->
      </div>
    </div>
    <!-- <IepAppFooterBar></IepAppFooterBar> -->
  </div>
</template>

<script>
import searchTop from './searchTop'
import projectTab from './Librarys/projectTab'
import newsTab from './Librarys/news'
import materialTab from './Librarys/materialTab'
import trainTab from './Librarys/trainTab'
import contractTab from './Librarys/contractTab'
import businessTab from './Librarys/businessTab'
import userTab from './Librarys/userTab'
import honorTab from './Librarys/honorTab'
import { getSearchCount } from '@/api/app/cpms/channel'
import { getRectagsList } from '@/api/app/tms/index'

export default {
  components: { searchTop, projectTab, newsTab, materialTab, trainTab, contractTab, businessTab, userTab, honorTab },
  data () {
    return {
      activeTab: 'cy',
      labelTitle1: '标签库',
      labelTitle2: '标准库',
      listTitle1: '相关客户',
      listTitle2: '战略伙伴',
      query: {},
      counts: {
        countProject: 0,
        countMaterial: 0,
        countTraining: 0,
        countContract: 0,
        countOpportunity: 0,
        countUser: 0,
        countHonor: 0,
      },
      labelList: [],
    }
  },
  computed: {
    tabList () {
      return [
        {
          label: `成员（${this.counts.countUser}）`,
          value: 'cy',
        }, {
          label: '要闻（0）',
          value: 'yw',
        }, {
          label: `项目（${this.counts.countProject}）`,
          value: 'xm',
          disabled: true,
        }, {
          label: `材料（${this.counts.countMaterial}）`,
          value: 'cl',
        }, {
          label: `培训（${this.counts.countTraining}）`,
          value: 'px',
        }, {
          label: `合同（${this.counts.countContract}）`,
          value: 'ht',
        }, {
          label: `商机（${this.counts.countOpportunity}）`,
          value: 'sj',
        }, {
          label: `荣誉资质（${this.counts.countHonor}）`,
          value: 'ryzz',
        },
      ]
    },
  },
  methods: {
    getSearchCount (query) {
      getSearchCount(query).then(({ data }) => {
        this.counts = data.data
      })
    },
    loadPage (val) {
      // this.$router.push({
      //   query: {title: val.name},
      // })
      this.query.title = val.title
      this.getSearchCount(val)
      this.$nextTick(() => {
        this.$refs['content'].params.current = 1
        this.$refs['content'].loadPage(this.query.title)
      })
    },
    // 标签库
    getRectagsList () {
      getRectagsList().then(({ data }) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.query = { ...this.$route.query }
    this.getSearchCount(this.query)
    this.getRectagsList()
  },
}
</script>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 20px auto 0;
}
.main {
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-auto-flow: row dense;
  grid-column-gap: 25px;
  grid-template-columns: minmax(100px, 900px) minmax(100px, 300px);
}
</style>
<style scoped>
.search >>> .el-tabs__item {
  padding: 0 10px;
}
.search >>> .el-card {
  border: 0;
}
</style>
