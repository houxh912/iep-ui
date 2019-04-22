<template>
  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { name: '国脉集团宣传PPT（16篇）' },
        { name: '营商环境评价中心（8篇）' },
        { name: '全球敏捷运维峰会' },
        { name: '2019首届长三角地区营商环境专题论坛' },
        { name: '2019首届长三角地区营商环境论坛' },
        { name: '2019珠三角营商环境与数字政府理论与实践' },
        { name: '全球敏捷运维峰会' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.piece {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .name {
    display: inline-block;
    margin: 5px 0;
    position: relative;
    padding-left: 15px;
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      top: 7px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
