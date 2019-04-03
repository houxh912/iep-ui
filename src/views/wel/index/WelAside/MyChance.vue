<template>
  <div class="chance">
    <div class="title">我的机会</div>
    <div class="treasure-content" v-for="item in opportunity" :key="item.id">
      <div class="subtitle cursor" @click="chanceDetail(item.id)">{{item.name}}</div>
      <div class="text">
        <span class="date">{{item.time}}</span>
        <span class="author">{{item.author}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    opportunity: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      chanceList: {        title: '我的机会', details: [
          { subtitle: '国策数据加工有偿招募志愿者', date: '2019-04-04', author: '王丽娜' },
          { subtitle: '内网运维有偿招募志愿者', date: '2019-03-29', author: '缪巧巧' },
          { subtitle: '数据基因模块有偿招募志愿者', date: '2019-03-27', author: '邵奇凯' },
          { subtitle: '研发中心有偿招募技术人员', date: '2019-03-22', author: '潘超巧' },
        ]      },
    }
  },
  methods: {
    chanceDetail () {
      // console.log(index)
    },
  },
}
</script>
<style lang="scss" scoped>
.chance {
  box-sizing: border-box;
  margin: 10px;
  .text {
    padding-bottom: 5px;
    color: #979797;
    .date {
      padding-right: 10px;
    }
  }
  .subtitle {
    padding: 5px 0;
    font-size: 14px;
    &:hover {
      color: #cb132d;
    }
  }
}
.title {
  padding: 0 0 10px;
  font-size: 16px;
  font-weight: 500;
}
.cursor {
  cursor: pointer;
}
</style>