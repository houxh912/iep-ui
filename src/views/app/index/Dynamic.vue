<template>
  <div class="baner">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle">{{title}}</span>
            <el-button style="float: right; padding: 3px 0; coloe:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="dynamicList">
                <div v-for="(item,index) in dynamicList" :key="index" class="piece">
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
        title:'国脉动态',
        dynamicList: ['【喜报】国脉海洋获质量管理体系认证','【喜报】国脉海洋获质量管理体系认证','【喜报】国脉海洋获质量管理体系认证','【喜报】国脉海洋获质量管理体系认证','【喜报】国脉海洋获质量管理体系认证','【喜报】国脉海洋获质量管理体系认证'],
    }
  },
}
</script>
<style lang="scss" scoped>
.dynamicList{
    .piece{
        height: 35px;
        line-height: 35px;
    }
}
</style>
