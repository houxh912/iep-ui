<template>
  <div class="grid-content">
    <iepAppTabCard :title="title">
      <div class="introduce">
        <span v-text="introduce"></span>
        <span class="red" style="display:inline-block;margin-bottom:15px;">【详细】</span>
        <div class="task">
          <i class="el-icon-arrow-left"></i>
          <img :src="item.imgSrc" v-for="(item,index) in img" :key="index">
          <i class="el-icon-arrow-right"></i>
        </div>
        <div class="feedback">
          <span>意见与建议（24）</span>
          <span class="fr">投诉与举报（12）</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '品牌、平台与研究委员会介绍',
      img: [
        { imgSrc: require('../images/expert1.jpg') },
        { imgSrc: require('../images/expert2.png') },
        { imgSrc: require('../images/expert3.png') },
        { imgSrc: require('../images/expert4.png') },
        { imgSrc: require('../images/expert5.jpg') },
      ],
      introduce: '委员会做出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行。委员会做出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行委员会做出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行',
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  font-size: 18px;
  color: #000;
}
.introduce {
  i {
    display: inline-block;
    font-size: 32px;
    color: #ccc;
    vertical-align: middle;
  }
  .task {
    margin-bottom: 15px;
    img {
      display: inline-block;
      margin: 10px;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      background-color: #ccc;
    }
  }
}
.feedback {
  span {
    padding: 5px 20px;
    background-color: #eee;
    text-align: left;
  }
}
.red {
  color: #bb1a20;
}
.fr {
  float: right;
}
</style>
