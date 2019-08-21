<template>
  <div class="subject">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard isReference :dataList="labelList" @click="handleDetail" name="topic" grade="count"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getHotTopics } from '@/api/cpms/thoughts'
export default {
  data () {
    return {
      labelTitle: '热门话题榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push({ path: '/app/subject_list', query: {title: row.topic, id: row.topicId} })
    },
    loadData () {
      getHotTopics().then(({ data }) => {
        this.labelList = data.data.slice(0, 10)
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
