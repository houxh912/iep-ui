<template>
  <div class="resources">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{title}}</span>
        <el-button class="btn" type="text">换一批</el-button>
      </div>
      <div>
        <div class="classify">
          <span class="sub-title">分类：</span>
          <span class="pieceDeletion" v-for="(name,index) in nameList" :key="index" :class="showClass1==index?'color':''" @click="tab1(index)">{{name.name}}<span class="data-con">{{name.data}}</span></span>
        </div>
        <div class="resourcesList">
          <div v-for="(item,index) in resourcesList" :key="index" class="piece">
            <div class="img-con"><img :src="item.img" class="img" alt=""></div>
            <div class="text">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showClass1: 0,
      title: '光彩国脉人',
      nameList: [
        {
          name: '技术之星',
          data: '(2人)',
        },
        {
          name: '品牌达人',
          data: '(11人)',
        },
        {
          name: '销售达人',
          data: '(56人)',
        },
        {
          name: '材料达人',
          data: '(34人)',
        },
        {
          name: '贡献达人',
          data: '(13人)',
        },
      ],
      resourcesList: [
        { img: '../img/person/p1.jpg', name: '江江', department: '北方区业务一部' },
        { img: '../img/person/p2.jpg', name: '江江', department: '海南办事处' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉集团研发中心' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉先锋队' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉海洋信息发展有限公司' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉先锋队' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉先锋队' },
        { img: '../img/person/p1.jpg', name: '江江', department: '国脉先锋队' },
        { img: '../img/person/p2.jpg', name: '吴吴', department: '国脉先锋队' },
      ],
    }
  },
  methods: {
    tab1 (val) {
      this.showClass1 = val
    },
  },
}
</script>
<style lang="scss" scoped>
.data-con {
  font-size: 12px;
}
.resources {
  .classify {
    padding: 9px 0;
    .sub-title + .appellation {
      color: #cb3737;
      background: #fef0f0;
      border-color: #cb3737;
    }
  }
  .pieceDeletion {
    display: inline;
    padding: 2px 10px;
    border-radius: 12px;
    border: 1px solid #ffffff;
    margin: 0 10px;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
    }
  }
  .color {
    background-color: #fef6f4;
    border: 1px solid #dc8687;
    color: #dc8687;
  }
}
.resourcesList {
  display: grid;
  margin-top: 15px;
  grid-auto-flow: row dense;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 40px;
  grid-column-gap: 20px;
  padding: 20px 0 13px;
  .piece {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
    .img-con {
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
    .text {
      margin-left: 20px;
    }
    .department {
      display: block;
      margin-top: 5px;
      color: #999;
    }
  }
}
.btn {
  float: right;
  padding: 5px 0;
  color: #cb3737;
  &:hover {
    color: #f56c6c;
  }
}
.cardTitle {
  font-size: 18px;
  .datas {
    color: #999;
  }
}
</style>
