<template>
  <div class="learningResources">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        </div>
        <div>
            <div class="learningResourcesList">
                <div v-for="(item,index) in learningResourcesList" :key="index" class="piece">
                    {{item}}
                </div>
                <iep-button type="" plain class="lr-btn">JAVA规范认定</iep-button>
                <iep-button type="" plain class="lr-btn">产品能力认证</iep-button>
            </div>
        </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
        title:'学习资源',
        learningResourcesList: [
            '关于项目验收表格标准化',
            '关于项目验收表格标准化',
            '关于项目验收表格标准化',
            '关于项目验收表格标准化',
            '关于项目验收表格标准化',
            '关于项目验收表格标准化'],
    }
  },
}
</script>
<style lang="scss" scoped>
.learningResourcesList{
    .piece{
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        position: relative;
        margin-left: 15px;
        &:hover {
            color: #cb3737;
            &:before{
                background-color: #cb3737;
            }
        }
        &:before{
            content: "";
            position: absolute;
            left: -15px;
            top: 14px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #999;
        }
    }
    .lr-btn{
        margin: 10px 5px 5px;
    }
}
</style>
