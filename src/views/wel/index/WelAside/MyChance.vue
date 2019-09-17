<template>
  <my-content class="my-content" title-name="我的机会">
    <iep-no-data v-if="!opportunity.length"></iep-no-data>
    <div v-for="item in opportunity" :key="item.id">
      <div class="subtitle cursor" @click="chanceDetail(item.id)">{{item.name}}</div>
      <div class="text">
        <span class="date">{{item.time | formatTime}}</span>
        <span class="author">{{item.author}}</span>
      </div>
    </div>
  </my-content>
</template>
<script>
import MyContent from './MyContent'
export default {
  components: { MyContent },
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
.my-content {
  .text {
    padding-bottom: 5px;
    color: #999;
    .date {
      padding-right: 10px;
    }
  }
  .subtitle {
    cursor: pointer;
    padding: 5px 0;
    font-size: 14px;
    &:hover {
      color: #cb132d;
    }
  }
}
</style>