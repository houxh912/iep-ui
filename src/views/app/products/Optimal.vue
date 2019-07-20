<template>
  <div class="optimal">
    <iepAppTabCard :title="title1">
      <div class="technology-list">
        <div v-for="(item,index) in technologyList" :key="index" class="piece" @click="technologyDetail(item.id)">
          <iep-img :src="item.img" alt=""></iep-img>
          <div class="text">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
            <span class="label">{{item.label}}</span>
          </div>
        </div>
      </div>
    </iepAppTabCard>
    <IepAppTabCard :title="title2" :linkName="linkName" class="last-card">
      <div class="last-month">
        <div v-for="(item,index) in lastMonth" :key="index" class="piece" @click="technologyDetail(item.id)">
          <iep-img :src="item.img" alt=""></iep-img>
          <div class="text">
            <div class="title">
              <span class="name">{{item.name}}</span>
              <span class="department">{{item.department}}</span>
            </div>
            <span class="label">{{item.label}}</span>
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title1: '技术之星',
      title2: '上月最佳',
      linkName: '',
      technologyList: [
        { id: 35, img: require('./img/optimal1.jpg'), name: '钟乙乔', department: '集团研发中心', label: '需求分析/原型设计/知识图谱' },
        { id: 30, img: require('./img/optimal2.jpg'), name: '张灵', department: '国脉集团研发中心运维组', label: 'DNA运维/环境配置/服务器部署' },
      ],
      lastMonth: [{ id: 11, img: require('./img/optimal3.jpg'), name: '丁斌', department: '产品与技术委员会', label: '微服务/需求梳理/数据门户' }],
    }
  },
  methods: {
    technologyDetail (val) {
      this.$router.push({
        path: `/app/personal_style/${val}`,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.technology-list,
.last-month {
  .piece {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.5s;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 18px;
    }
    &:hover .name {
      color: #cb3737;
    }
    .text {
      width: 270px;
      height: 50px;
      float: left;
      .title {
        height: 25px;
        line-height: 25px;
        .department {
          margin-left: 4px;
          color: #999;
        }
      }
      .label {
        height: 25px;
        line-height: 25px;
      }
    }
  }
}
.last-card {
  margin-top: -4px;
  border-top-color: #fff;
  .last-month {
    .piece {
      cursor: pointer;
      overflow: hidden;
      margin-top: 14px;
    }
  }
}
</style>
<style scoped>
.last-card >>> .el-card__body {
  padding-top: 0;
}
.last-card >>> .el-card__header {
  padding-top: 0;
}
.technology-list >>> .el-image,
.last-month >>> .el-image {
  width: 50px;
  height: 50px;
}
.optimal {
  height: 318px;
  overflow: hidden;
  border-bottom: 1px solid #ebeef5;
}
</style>
