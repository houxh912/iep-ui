<template>
  <div class="praise">
    <IepAppTabCard :title="labelTitle">
      <IepAppRankingCard :dataList="labelList" @click="handleDetail"></IepAppRankingCard>
    </IepAppTabCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelTitle: '热门话题榜',
      labelList: [],
    }
  },
  methods: {
    handleDetail () {},
  },
}
</script>
