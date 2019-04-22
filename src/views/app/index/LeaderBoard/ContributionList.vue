<template>
  <div class="leader-board">
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <span class="count" :class="item.color">{{index+1}}</span>
      <span class="name">{{item.name}}</span>
      <span class="grade">{{item.grade}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { name: '郑爱军', grade: '3580', color: 'red' },
        { name: '杨冰之', grade: '3420', color: 'red' },
        { name: '张小燕', grade: '2988', color: 'red' },
        { name: '王林源', grade: '2455', color: '' },
        { name: '张小燕', grade: '2200', color: '' },
        { name: '黄成详', grade: '1982', color: '' },
        { name: '苏肖', grade: '1852', color: '' },
        { name: '刘畅', grade: '1650', color: '' },
        { name: '谢海艳', grade: '1250', color: '' },
        { name: '胡小丽', grade: '1122', color: '' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.leader-board {
  padding: 10px 20px 15px;
  .piece {
    cursor: pointer;
    .name {
      height: 30px;
      line-height: 30px;
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
}
</style>
