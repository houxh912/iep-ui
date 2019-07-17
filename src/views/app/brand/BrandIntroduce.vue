<template>
  <div class="grid-content">
    <iepAppTabCard :title="title" :linkName="linkName">
      <div class="introduce">
        <span v-text="introduce"></span>
        <el-button class="red" type="text">【详细】</el-button>
        <div class="person">
          <el-carousel height="84px" :interval="5000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <div v-for="(item,index) in wonderfulList" :key="index" class="piece">
                <div class="img">
                  <span class="bgb">{{item.post}}</span>
                  <iep-img :src="item.imgSrc" class="img"></iep-img>
                </div>
                <span class="name">{{item.name}}<span class="dn show1" :class="item.show1">V</span></span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="feedback">
          <span> <i class="icon-custom"></i> 意见与建议</span>
          <span class="fr"> <i class="icon-tousu"></i> 投诉与举报</span>
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
      linkName: '',
      wonderfulList: [
        { imgSrc: require('./images/expert1.jpg'), name: '杨冰之' },
        { imgSrc: require('./images/expert2.png'), name: '郑爱军' },
        { imgSrc: require('./images/expert3.png'), name: '王路燕' },
      ],
      introduce: '委员会做出的决策都是经过集体讨论并通过的，因而它有利于避免权力过分集中，防止一个人独断专行。',
    }
  },
}
</script>
<style lang='scss' scoped>
.title {
  color: #333;
}
.introduce {
  & > span {
    line-height: 25px;
  }
  .person {
    padding-top: 18px;
    margin-bottom: 17px;
    overflow: hidden;
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
    .show1 {
      display: inline-block;
      margin: 0 5px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      font-size: 12px;
      line-height: 15px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .name {
      display: block;
      margin-top: 10px;
    }
    .piece {
      float: left;
      margin: 0 9px;
      width: 54px;
      text-align: center;
      overflow: hidden;
      .img {
        position: relative;
        width: 100%;
        height: 54px;
        overflow: hidden;
        border-radius: 50%;
        cursor: pointer;
        .bgb {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          line-height: 54px;
          font-size: 12px;
          text-align: center;
          display: block;
          border-radius: 50%;
          color: #fff;
          z-index: 100;
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover .bgb {
          background: rgba(0, 0, 0, 0.5);
          opacity: 1;
        }
        img {
          width: 100%;
          height: 54px;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            cursor: pointer;
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
.feedback {
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    width: 45%;
    background-color: #f8f8f8;
    line-height: 35px;
    cursor: pointer;
    transition: 0.5s;
    &:hover {
      background-color: #f0f0f0;
    }
    i {
      margin-right: 5px;
      font-size: 24px !important;
      color: #aaa;
      vertical-align: -4px;
    }
  }
}
.red {
  display: inline-block;
  padding: 0;
  color: #bb1a20;
  cursor: pointer;
  &:hover {
    color: #f56c6c;
  }
}
</style>
<style scoped>
.person >>> .el-carousel__item {
  left: 40px;
}
.person >>> .el-carousel__indicators {
  display: none;
}
.person >>> .el-card {
  height: 330px;
}
.person >>> .el-carousel__arrow {
  background: none;
}
.person >>> .el-carousel__arrow i {
  font-size: 36px;
  color: #666;
}
.person >>> .el-carousel__item {
  left: 25px;
  width: 96%;
}
.person >>> .el-carousel__arrow--left {
  left: -8px;
}
.person >>> .el-carousel__arrow--right {
  right: -8px;
}
.grid-content >>> .el-card {
  height: 320px;
}
</style>