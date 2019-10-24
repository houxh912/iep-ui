<template>
  <div class="ranking">
    <div v-if="dataList.length !== 0">
      <el-popover v-for="(item, index) in dataList" :key="index" placement="right-end" title="" :width="width" trigger="hover" :content="item[name]">
        <div class="piece" @click="handleDetail(item)" slot="reference">
          <span class="count" :class="index < 3 ? 'red' : ''">{{index + 1}}</span>
          <span class="name-top" v-if="item.status === 2">
            <span class="name-top-detail">{{item[name]}}</span>
            <span class="name-top-icon">置顶</span>
          </span>
          <span class="name" v-else>{{item[name]}}</span>
          <span class="grade">{{item[grade]}}</span>
        </div>
      </el-popover>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>
<script>
export default {
  name: 'IepAppRankingCard',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    name: {
      type: String,
      default: 'name',
    },
    grade: {
      type: String,
      default: 'grade',
    },
    width: {
      default: 300,
    },
  },
  methods: {
    handleDetail (row) {
      this.$emit('click', row)
    },
  },
}
</script>
<style lang="scss" scoped>
.ranking {
  padding: 2px 0;
  .piece {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #333;
    transition-duration: 0.3s;
    transition: 0.5s;
    cursor: pointer;
    .name {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60%;
      display: inline-block;
      vertical-align: middle;
    }
    .name-top {
      height: 30px;
      line-height: 30px;
      display: inline-block;
      vertical-align: middle;
      width: 60%;
      .name-top-detail {
        max-width: 115px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        vertical-align: middle;
      }
      .name-top-icon {
        border: 1px solid $--color-primary;
        color: $--color-primary;
        border-radius: 3px;
        font-size: 12px;
        padding: 0 5px;
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        height: 18px;
        line-height: 16px;
      }
    }
    .count {
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      margin-right: 20px;
      background-color: #ccc;
      color: #fff;
      display: inline-block;
    }
    .red {
      background-color: $--color-primary;
    }
    .grade {
      float: right;
      color: $--color-primary;
      width: 68px;
      text-align: right;
    }
    &:hover {
      color: $--menu-color-primary;
    }
  }
}
</style>

