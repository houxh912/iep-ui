<template>
  <div class="institutionalDocument">
    <el-card class="index-card" shadow="never">
        <div slot="header" class="clearfix">
            <span class="cardTitle" style="font-size:18px;">{{title}}</span>
        </div>
        <div>
            <div class="institutionalDocumentList">
                <div v-for="(item,index) in institutionalDocumentList" :key="index" class="piece">
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
        title:'制度文件',
        institutionalDocumentList: [
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0',
            '制度|数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
.institutionalDocumentList{
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
}
</style>
