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
        title:'文化制度',
        honorList: [
            '制度|国脉互联各子公司相关惩罚管理',
            '文件|薪资福利及股权激励相关通知',
            '制度|国脉互联班委会管理制度',
            '制度|关于加强国脉平台发展的指导意见',
            '文件|关于集团组织架构、五大板块管理',
            '文件|关于项目验收表格材料标准化模版',
            '制度|国脉商务礼仪规范与工作守则',
            '制度|内网个人风采页完善指标项及信息填写规范'],
    }
  },
}
</script>
<style lang="scss" scoped>
.honorList{
    .piece{
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        position: relative;
        margin-left: 15px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
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
}
</style>
