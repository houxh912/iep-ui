<template>
  <div class="grid-content">
    <el-card class="box-card" shadow="naver">
      <div slot="header" class="clearfix title-con">
        <span class="title">关于国脉</span>
        <el-button class="btn" type="text">了解更多></el-button>
      </div>
      <div class="aboutGov">
        <p v-text="aboutGov"></p>
        <div class="about-list">
          <div v-for="item in dataList" :key="item" class="piece">
            {{item}}
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
      aboutGov: '长期以来，公司始终把打造国脉科技专业、诚信服务品牌位核心。长期以来，公司始终把打造国脉科技专业、诚信的服务品牌作为核心。长期以来，公司始终把打造国脉科技专业诚信的服务品牌作为核心',
      dataList: ['国脉优势', '发展历程', '专家团队', '大事记'],
    }
  },
}
</script>
<style lang='scss' scoped>
.title-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  flex: 2;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  color: #333;
}
.btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
}
.aboutGov p {
  font-size: 14px;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
.el-tag--info {
  padding: 0 20px;
  margin-right: 20px;
  margin-bottom: 10px;
}
.about-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    color: #333;
    &:hover {
      background-color: #cb3737;
      color: #fff;
    }
  }
}
</style>
<style scoped>
.grid-content >>> .el-card__header {
  padding: 18px 0 9px;
}
.grid-content >>> .el-card__body {
  padding: 0;
}
.grid-content >>> .el-card {
  padding: 0 20px;
}
</style>

