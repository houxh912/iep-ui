<template>
  <div class="honor">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
            <el-button style="float: right; padding: 5px 0; color:#999;" type="text">更多>></el-button>
        </div>
        <div>
            <div class="honorList">
                <div v-for="(item,index) in honorList" :key="index" class="piece">
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
        title:'国脉荣誉',
        honorList: ['高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证','高新企业认证'],
    }
  },
}
</script>
<style lang="scss" scoped>
.honorList{
    .piece{
        cursor: pointer;
        height: 30px;
        line-height: 30px;
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
            top: 12px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #999;
        }
    }
}
</style>
