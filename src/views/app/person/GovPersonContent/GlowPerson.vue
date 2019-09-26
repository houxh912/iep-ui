<template>
  <div class="resources">
    <IepAppTabCard :title="title" :linkName="linkName">
      <!-- <el-button class="btn" type="text" slot="right">换一批</el-button> -->
      <el-carousel :interval="5000" arrow="always" style="padding-left:40px;">
        <el-carousel-item v-for="item in itemLength" :key="item">
          <div class="resourcesList">
            <div v-for="(item,index) in resourcesList.slice((item-1)*9,item*9)" :key="index" class="piece" @click="handleOpen()">
              <div class="img-con">
                <iep-img :src="item.avatar" class="img" alt=""></iep-img>
              </div>
              <div class="text">
                <div class="title"><span>{{item.name}}</span><span class="selectionName">{{item.selectionName}}</span></div>
                <div class="orgName">{{item.orgName}}</div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </IepAppTabCard>
  </div>
</template>
<script>
import { getGlowPersonList } from '@/api/app/hrms/'
export default {
  data () {
    return {
      showClass1: 0,
      title: '光彩国脉人',
      linkName: '',
      nameList: [
        {
          name: '全部',
          data: '(506人)',
        },
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
      ],
      itemLength: '',
    }
  },
  created () {
    getGlowPersonList().then(({ data }) => {
      this.resourcesList = data.data
      this.itemLength = Math.ceil(this.resourcesList.length / 9)
      console.log(this.itemLength)
    })
  },
  methods: {
    tab1 (val) {
      this.showClass1 = val
    },
    handleOpen () {
      this.$router.push({
        path: '/app/personal_style',
      })
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
      width: 70%;
    }

    .title {
      font-size: 16px;
      .selectionName {
        margin-left: 10px;
        color: #ba1b21;
        background-color: #f8e8e9;
        border: 1px solid #cb3737;
        border-color: #f1d1d3;
        border-radius: 4px;
        padding: 0 4px;
        font-size: 12px;
      }
    }
    .orgName {
      display: block;
      margin-top: 5px;
      color: #999;
    }
  }
}
.btn {
  padding: 0;
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
<style scoped>
.resources >>> .el-card {
  height: 384px;
}
.resources >>> .el-carousel__arrow--left {
  left: -40px;
}
</style>

