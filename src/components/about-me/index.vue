<template>
  <div class="aboutMe">
    <div class="created">
      <div class="title">{{creatList.title}}</div>
      <div class="created-content">
        <div v-for="(item,index) in creatList.details" :key="index">{{item}}</div>
        <div @click="handelAdd"><i class="el-icon-plus"></i></div>
      </div>
    </div>
    <div class="find">
      <div class="title">
        <div class="inline">{{findList.title}}</div>
        <div class="more inline" @click="getMore">
          <span>更多</span>
          <span><i class="el-icon-d-arrow-right"></i></span>
        </div>
      </div>
      <div class="find-content">
        <div class="cursor" v-for="(item,index) in findList.details" :key="index" @click="hadelSelect(index)">
          <div class="icon"><i :class="item.icon"></i></div>
          <div class="subtitle">{{item.subtitle}}</div>
        </div>
      </div>
    </div>
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
      </div>
      <div class="treasure-list">
        <div :class="showClass==index?'active':''" v-for="(item,index) in treasureData.dataList" :key="index" @click="tagList(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="chance">
      <div class="title">{{chanceList.title}}</div>
      <div class="treasure-content" v-for="(item,index) in chanceList.details" :key="index">
        <div class="subtitle cursor" @click="chanceDetail(index)">{{item.subtitle}}</div>
        <div class="text">
          <span class="date">{{item.date}}</span>
          <span class="author">{{item.author}}</span>
        </div>
      </div>
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
      findList: { title: '我要找', details: [{ icon: 'el-icon-picture-outline', subtitle: '方案' }, { icon: 'el-icon-share', subtitle: '模板' }, { icon: 'el-icon-rank', subtitle: '项目' }, { icon: 'el-icon-picture-outline', subtitle: '师傅' }] },
    }
  },
  props: {
    creatList: {
      type: Object,
      default: () => { },
    },
    chanceList: {
      type: Object,
      default: () => { },
    },
    treasureData: {
      type: Object,
      default: () => { },
    },
  },
  created () {
    this.total = this.treasureData.dataList[2].totalMoney
    this.change = this.treasureData.dataList[2].change
  },
  methods: {
    //我要创建添加按钮
    handelAdd () {
      this.$emit('handelAdd')
    },
    //更多
    getMore () {

    },
    //我要找选择函数
    hadelSelect (index) {
      console.log(index)
    },
    //我的机会标题点击事件
    chanceDetail (index) {
      console.log(index)
    },
    //我的财富tab切换
    tagList (index) {
      this.showClass = index
      this.total = this.treasureData.dataList[index].totalMoney
      this.change = this.treasureData.dataList[index].change
    },
  },

}
</script>
<style lang="scss">
//盒子
.aboutMe {
  width: 245px;
  padding: 10px;
  background: #fafafa;
  font-size: 12px;
  > div {
    padding: 10px 10px 20px 10px;
    border-bottom: 1px solid #ececec;
  }
  .inline {
    display: inline-block;
  }
  .more {
    float: right;
    font-size: 12px;
    vertical-align: middle;
    cursor: pointer;
    color: #7e7e7e;
  }
}
//我要创建content
.created-content {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: auto auto auto;
  text-align: center;
  background: #ececec;
  grid-gap: 1px;
  div {
    padding: 10px 0;
    background-color: #fafafa;
  }
}
//我要找content
.find-content {
  content: "";
  clear: both;
  display: flex;
  > div {
    flex-grow: 1;
    text-align: center;
  }
  .icon {
    padding: 10px 0;
  }
}
//我的财富
.treasure {
  .title {
    display: flex;
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
    }
  }
}

.title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
}
//我的机会
.chance {
  .text {
    padding-bottom: 5px;
    color: #979797;
    .date {
      padding-right: 10px;
    }
  }
  .subtitle {
    padding: 5px 0;
  }
}
//鼠标悬停
.cursor {
  cursor: pointer;
}
</style>


