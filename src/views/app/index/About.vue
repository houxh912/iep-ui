<template>
  <div class="about">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle">{{title}}</span>
        <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">了解更多>></el-button>
      </div>
      <div>
        <p>国脉集团是中国领先的大数据治理和数据服务专业机构。创新提出“软件+咨询+平台+数据+创新...</p>
        <div class="aboutList">
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
      title: '我的待办',
      dataList: ['集团概况','企业文化','组织机构','专家团队','发展历程','业务领域'],
    }
  },
}
</script>
<style lang="scss" scoped>
.aboutList{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  .piece{
    height:30px;
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    color:#333;
  }
}
</style>
