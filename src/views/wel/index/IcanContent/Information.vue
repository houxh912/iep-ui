<template>
  <div class="information-wrapper">
    <div class="tabs-wrapper">
      <div class="tab-item" :class="{'active':activeId===item.id}" v-for="item in collections" :key="item.id" @click="handleActive(item)">{{item.name}}</div>
    </div>
    <iep-no-data v-if="!listData.length"></iep-no-data>
    <div v-else class="list-wrapper">
      <div class="list-item" v-for="item in listData" :key="item.id">
        <el-link class="iep-ellipsis-flex" :title="item.name" @click="handleOpen(item)">{{item.name}}</el-link>
        <!-- <iep-div-detail class="link" :value="item.name"></iep-div-detail> -->
        <div class="time">{{item.time | parseToMonthDay}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPendingList } from '@/api/wel/et'
export default {
  data () {
    return {
      activeId: 1,
      collections: [
        {
          id: 1,
          name: '公告',
        },
        {
          id: 2,
          name: '任务',
        },
        {
          id: 3,
          name: '机会',
        },
        {
          id: 4,
          name: '考试',
        },
        {
          id: 5,
          name: '活动',
        },
      ],
      listData: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleActive (item) {
      this.activeId = item.id
      this.loadPage()
    },
    handleOpen (item) {
      this.$openPage(`/ims_spa/announcement_detail/${item.id}`)
    },
    async loadPage () {
      const { data } = await getPendingList(this.activeId)
      this.listData = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
  width: 100%;
  padding: 10px 0;
}
.list-item {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;

  .time {
    flex: 0 0 100px;
    text-align: right;
    color: #999;
  }
}
.information-wrapper {
  margin: 20px;
}
.tabs-wrapper {
  display: flex;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  .tab-item {
    margin: 0 40px 0 0;
    padding: 10px 0;
    cursor: pointer;
    &.active {
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
    &:hover {
      color: $--color-primary;
      border-bottom: 2px solid $--color-primary;
    }
  }
}
</style>
