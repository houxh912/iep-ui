<template>
  <div class="chance">
    <div class="title">{{chanceList.title}}</div>
    <div class="treasure-content" v-for="(item,index) in chanceList.details" :key="index">
      <div class="subtitle cursor" @click="chanceDetail(index)">{{item.subtitle}}</div>
      <div class="text">
        <span class="date">{{item.date}}</span>
        <span class="author">{{item.author}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      chanceList: { title: '我的机会', details: [{ subtitle: '国策数据加工招募有偿志愿者', date: '2019-01-29', author: '王丽娜' }, { subtitle: '国策数据加工招募有偿志愿者', date: '2019-01-29', author: '王丽娜' }, { subtitle: '国策数据加工招募有偿志愿者', date: '2019-01-29', author: '王丽娜' }, { subtitle: '国策数据加工招募有偿志愿者', date: '2019-01-29', author: '王丽娜' }] },
    }
  },
  methods: {
    chanceDetail (index) {
      console.log(index)
    },
  },
}
</script>
<style lang="scss" scoped>
.chance {
  .text {
    padding-bottom: 5px;
    color: #979797;
    .date {
      padding-right: 10px;
    }
  }
  .subtitle {
    padding: 5px 0;
    &:hover {
      color: #cb132d;
    }
  }
}
.title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>