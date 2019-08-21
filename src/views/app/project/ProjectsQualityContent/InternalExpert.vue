<template>
  <div class="recommendable">
    <IepAppTabCard :title="title" :linkName="linkName" isMore :data="data">
      <div v-for="(item,index) in leaderBoardList" :key="index" class="piece">
        <div class="img-con">
          <iep-img :src="item.img" class="img"></iep-img>
        </div>
        <div class="expert">
          <span class="name">{{item.name}}<span class="num">{{item.num}}</span></span>
          <span class="des">{{item.des}}</span>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: '(35个)',
      title: '内部质量评审专家',
      linkName: '',
      leaderBoardList: [
        { img: '../img/person/p01.jpg', name: '杨冰之', num: '（项目76）', des: '国脉集团董事长' },
        { img: '../img/person/p05.jpg', name: '郑爱军', num: '（项目76）', des: '国脉集团总经理' },
        { img: '../img/person/p04.jpg', name: '王路燕', num: '（项目76）', des: '集团副总' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.piece {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  .img-con {
    float: left;
    margin-right: 15px;
    width: 60px;
    height: 60px;
    border: 1px solid #ebeef5;
    overflow: hidden;
  }
  .img {
    width: 100%;
    height: 100%;
    transition: 0.5s;
    &:hover {
      transform: scale(1.1);
    }
  }
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
  }
  .expert {
    display: inline-block;
    p:nth-child(1) {
      margin-bottom: 0;
    }
  }
  .num {
    font-size: 12px;
    color: #999;
  }
  .des {
    display: block;
    font-size: 14px;
    color: #666;
  }
}
</style>

<style scoped>
.recommendable >>> .el-card {
  height: 320px;
}
</style>