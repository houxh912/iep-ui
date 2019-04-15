<template>

  <div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="count" :class="item.color">{{index+1}}</span>
      <span class="name">{{item.name}}</span>
    </div>
    <div class="todyInfo">
      <span>今日公告：</span>
      <span>2019第十三届湖南连锁加盟</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { name: '首届长三角营商环境论坛在沪召开的', color: 'red' },
        { name: '首届长三角营商环境论坛在沪召开的', color: '' },
        { name: '首届长三角营商环境论坛在沪召开的', color: '' },
        { name: '首届长三角营商环境论坛在沪召开的', color: '' },
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
  margin-bottom: 10px;
  cursor: pointer;
  .name {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: #bb1a20;
  }
  .grade {
    float: right;
    color: #bb1a20;
  }
  &:hover {
    color: #cb3737;
  }
}
.todyInfo {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #eee;
}
</style>
