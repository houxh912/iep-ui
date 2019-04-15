<template>
  <div>
    <div class="type">
      <span>分类：</span>
      <span v-for="(item,index) in type" :key="index">{{item}}</span>
    </div>
    <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
      <img :src="item.imgSrc" alt="">
      <div class="expert">
        <p class="name">{{item.name}}</p>
        <p class="des">{{item.des}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      leaderBoardList: [
        { imgSrc: require('../images/tool1.jpg'), name: 'react', des: '用于构建用户界面的js库' },
        { imgSrc: require('../images/tool1.jpg'), name: '工具', des: '用于构建用户界面的js库' },
        { imgSrc: require('../images/tool1.jpg'), name: '工具', des: '用于构建用户界面的js库' },
        { imgSrc: require('../images/tool1.jpg'), name: '工具', des: '用于构建用户界面的js库' },
        { imgSrc: require('../images/tool1.jpg'), name: '工具', des: '用于构建用户界面的js库' },
        { imgSrc: require('../images/tool1.jpg'), name: '工具', des: '用于构建用户界面的js库' },
      ],
      type: ['全部', '编辑器', '研究工具', '截图工具', '设计工具'],
    }
  },
}
</script>

<style lang="scss" scoped>
.grid-content {
  grid-column-start: 1;
  grid-column-end: 3;
}
.type {
  margin-bottom: 10px;
  span {
    margin-right: 10px;
  }
}
.piece {
  display: inline-block;
  width: 50%;
  margin-bottom: 10px;
  img {
    width: 55px;
    height: 60px;
    vertical-align: top;
    margin-right: 10px;
  }
  .expert {
    display: inline-block;
    p:nth-child(1) {
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
  .des {
    font-size: 14px;
    color: #aaa;
  }
}
</style>
