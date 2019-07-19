<template>
  <div class="baner">
    <IepAppTabCard :title="title" :linkName="linkName">
      <IepAppAssortCard :dataList="dataList" @click="handleDetail"></IepAppAssortCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getIndexPage } from '@/api/conm/article_controller'

export default {
  data () {
    return {
      title: '国脉动态',
      dataList: [],
      linkName: '',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/news/news_detail/${row.id}`)
    },
  },
  created () {
    let params = {
      nodeNumber: 'groupNews',
      siteId: 1,
      current: 1,
      size: 6,
    }
    getIndexPage(params).then(({data}) => {
      this.dataList = data.data.records.map(m => { return { id: m.id, desc: m.title, assort: `【${m.nodeName}】` } })
    })
  },
}
</script>
<style lang="css" scoped>
.baner >>> .assort .piece .assort {
  margin-left: -8px;
}
.baner >>> .el-card {
  height: 280px;
}
</style>
