<template>
  <div class="grid-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">关于国脉</span>
        <el-button style="float: right; padding: 3px 0" type="text">了解更多></el-button>
      </div>
      <div class="aboutGov">
        <p v-text="aboutGov"></p>
        <el-tag size="medium" type="info" v-for="(item,index) in sign" :key="index">{{item}}</el-tag>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
    data () {
        return {
            aboutGov: '长期以来，公司始终把打造国脉科技专业、诚信服务品牌位核心。长期以来，公司始终把打造国脉科技专业、诚信的服务品牌作为核心。长期以来，公司始终把打造国脉科技专业诚信的服务品牌作为核心',
            sign:['国脉优势','发展历程','专家团队','大事记'],
        }
    },
}
</script>
<style lang='scss' scoped>
.title{
    font-size: 18px;
    color:#000;
}
.aboutGov p{
    font-size: 14px;
    color:#000;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
}
.el-tag--info{
    padding: 0 20px;
    margin-right: 20px;
    margin-bottom: 10px;
}
</style>

