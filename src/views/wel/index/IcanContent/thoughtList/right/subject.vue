<template>
  <div class="subject">
    <IepAppTabCard :title="labelTitle">
      <iep-app-ranking-card :dataList="labelList" @click="handleDetail" name="topic" grade="count"></iep-app-ranking-card>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getHotTopicsPage } from '@/api/cpms/thoughts'
import IepAppRankingCard from './RankingCard'
export default {
  components: { IepAppRankingCard },
  data () {
    return {
      labelTitle: '热门话题榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail (row) {
      console.log(row)
      return
      // this.$router.push({ path: '/app/subject_list', query: {title: row.topic, id: row.topicId} })
    },
    loadData () {
      getHotTopicsPage().then(({ data }) => {
        this.labelList = data.data.records
      })
    },
  },
  created () {
    this.loadData()
  },
}
</script>

<style scoped>
.subject >>> .el-card {
  height: 380px;
}
</style>
