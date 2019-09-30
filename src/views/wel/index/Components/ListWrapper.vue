<template>
  <wrapper :title="title">
    <iep-no-data v-if="!listData.length"></iep-no-data>
    <div v-else class="list-wrapper">
      <div class="list-item" v-for="item in listData" :key="item.id">
        <el-link class="iep-ellipsis-flex" :title="item.name" @click="handleOpen(item)">{{item.name}}</el-link>
        <!-- <iep-div-detail class="link" :value="item.name"></iep-div-detail> -->
        <div class="time">{{item.time | parseToMonthDay}}</div>
      </div>
    </div>
  </wrapper>
</template>

<script>
import Wrapper from './Wrapper'
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    requestFunc: {
      type: Function,
      required: true,
    },
  },
  components: {
    Wrapper,
  },
  data () {
    return {
      listData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleOpen (row) {
      this.$emit('open', row)
    },
    async loadPage () {
      const { data } = await this.requestFunc()
      this.listData = data.data || []
    },
  },
}
</script>

<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  width: 100%;
}
.list-item {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  .time {
    flex: 0 0 100px;
    text-align: right;
  }
}
</style>
