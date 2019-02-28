<template>
  <div class="treasure">
    <div class="title">
      <div class="flex">我的财富</div>
      <div class="flex samll">挖贝攻略<span><i class="el-icon-question"></i></span></div>
      <div class="line">|</div>
      <div class="flex samll">投资宝典<span><i class="el-icon-question"></i></span></div>
    </div>
    <div class="treasure-data">
      <div class="total">
        <div class="littleTitle">总资产</div>
        <div class="color">{{total}}</div>
      </div>
      <div class="change">
        <div class="littleTitle">今日变化</div>
        <div class="color">{{change}}</div>
      </div>
      <span class="rightTop"><i class="el-icon-success"></i></span>
    </div>
    <div class="treasure-list">
      <div :class="showClass==index?'active':''" v-for="(item,index) in treasureData.dataList" :key="index" @click="tagList(index)">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showClass: 2,
      total: '',
      change: '',
      treasureData: {
        title: '我的财富',
        dataList: [
          { name: '报销', totalMoney: 1111.2, change: 3333 },
          { name: '打赏', totalMoney: 2222.2, change: 2222 },
          { name: '投资', totalMoney: 3333.2, change: 3333 },
          { name: '互助基金', totalMoney: 4444.2, change: 4444 },
        ],
      },
    }
  },
  created () {
    this.total = this.treasureData.dataList[2].totalMoney
    this.change = this.treasureData.dataList[2].change
  },
  methods: {
    tagList (index) {
      this.showClass = index
      this.total = this.treasureData.dataList[index].totalMoney
      this.change = this.treasureData.dataList[index].change
    },
  },
}
</script>
<style lang="scss" scoped>
.treasure {
  box-sizing: border-box;
  margin: 10px;
}
.title {
  display: flex;
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
  .flex {
    flex-grow: 1;
    width: auto;
  }
  .line {
    padding: 0 10px 0 2px;
    color: #e0e0e0;
  }
  .samll {
    font-size: 13px;
    padding-top: 4px;
    color: #686868;
    line-height: 16px;
    cursor: pointer;
    position: relative;
    span {
      position: absolute;
      right: -2px;
      top: -3px;
      color: #c9c9c9;
    }
  }
}
.treasure-data {
  padding: 15px 0;
  background: white;
  border-radius: 6px;
  text-align: center;
  border: 1px solid #e8e8e8;
  position: relative;
  overflow: hidden;
  z-index: 99;
  .rightTop {
    display: inline-block;
    width: 45px;
    height: 45px;
    background: #f4f4f4;
    position: absolute;
    top: -23px;
    right: -22px;
    z-index: 98;
    transform: rotate(225deg);
    i {
      transform: rotate(-225deg);
    }
  }
  > div {
    display: inline-block;
    height: auto;
    width: 50%;
  }
  .total {
    position: relative;
  }
  .total:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    background: #ccc;
    height: 100%;
  }
  .littleTitle {
    padding-bottom: 10px;
    color: #959595;
  }
  .color {
    color: #cb132d;
    font-size: 18px;
  }
}
.treasure-list {
  margin-top: 10px;
  background: white;
  border-radius: 6px;
  display: flex;
  border: 1px solid #e8e8e8;
  .active {
    color: #cb132d;
  }
  > div {
    flex-grow: 1;
    padding: 10px 0;
    text-align: center;
    position: relative;
    color: #959595;
    cursor: pointer;
    &:after {
      content: "";
      width: 1px;
      height: 100%;
      background: #e8e8e8;
      position: absolute;
      right: 0;
      top: 0;
    }
    &:last-child:after {
      width: 0;
    }
    &:hover {
      color: #cb132d;
    }
  }
}
.cursor {
  cursor: pointer;
}
@media (min-width: 769px) and (max-width: 1026px) {
  .treasure {
    .title {
      font-size: 14px;
      .line {
        font-size: 10px;
      }
      .samll {
        font-size: 10px;
      }
    }
  }
}
@media screen and (max-width: 769px) {
}
</style>


