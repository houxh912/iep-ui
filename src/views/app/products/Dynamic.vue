<template>
  <div class="InstitutionalDocument">
    <iepAppTabCard :title="title">
      <IepAppListCard :dataList="dataList" @click="handleDetail" name="title"></IepAppListCard>
    </iepAppTabCard>
  </div>
</template>
<script>
import { getIndexPage } from '@/api/conm/article_controller'
export default {
  data () {
    return {
      title: '产品动态',
      dataList: [],
      params: {
        nodeNumber: '003',
        siteId: 1,
        current: 1,
        size: 3,
      },
    }
  },
  methods: {
    loadList () {
      getIndexPage(this.params).then(({ data }) => {
        this.dataList = data.data.records
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/news/news_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>
<style scoped>
.InstitutionalDocument >>> .el-card {
  height: 330px;
}
</style>
