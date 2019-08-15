<template>
  <div class="ranking">
    <div v-if="dataList.length !== 0">

      <div v-if="isReference">
        <el-popover v-for="(item,index) in dataList" :key="index" placement="right-end" title="" :width="width" trigger="hover" :content="item[name]">
          <div class="piece" @click="handleDetail(item)" slot="reference">
            <span class="count" :class="index==0||index==1||index==2?'red':''">{{index+1}}</span>
            <span class="name">{{item[name]}}</span>
            <span class="grade">{{item[grade]}}</span>
          </div>
        </el-popover>
      </div>

      <div v-else>
        <div class="piece" v-for="(item,index) in dataList" :key="index" @click="handleDetail(item)">
          <span class="count" :class="index==0||index==1||index==2?'red':''">{{index+1}}</span>
          <span class="name">{{item[name]}}</span>
          <span class="grade">{{item[grade]}}</span>
        </div>
      </div>

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
    isReference: {
      type: Boolean,
      default: false,
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

