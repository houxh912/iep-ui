<template>
  <div class="chance">
    <div class="title">我的机会</div>
    <div class="treasure-content" v-for="item in opportunity" :key="item.id">
      <div class="subtitle cursor" @click="chanceDetail(item.id)">{{item.name}}</div>
      <div class="text">
        <span class="date">{{item.time | formatTime}}</span>
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
  methods: {
    chanceDetail (id) {
      this.$openPage('/app/resource/business/business_detail/' + id)
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