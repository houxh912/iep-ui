<template>
  <div class="task">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button style="float: right; padding: 5px 0; color:#cb3737;" type="text" slot="right">产品与技术委员会></el-button>
      <div class="task-list">
        <el-table :data="tableData" style="width: 100%" size=medium  >
          <el-table-column prop="name" label="任务名称"></el-table-column>
            <el-table-column prop="process" label="进度" width="180">
                <el-progress :percentage="20" color="#68C769"></el-progress>
            </el-table-column>
          <el-table-column prop="principal" label="负责人" width="80"></el-table-column>
        </el-table>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '十大任务',
      linkName: '',
      tableData: [
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
          {name: '国脉2018数字政府与政务大数据建设高层研讨会专题设计',process: 20,principal: '洪琼'},
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.task{
    grid-column-start: 1;
    grid-column-end: 3; 
}
.task-list{
  .piece{
    cursor: pointer;
    height:30px;
    line-height: 30px;
    text-align: center;
    overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
    &:hover{
      color: #cb3737;
    }
  }
}
</style>
<style scoped>
.task >>> .el-table th {
  background-color: #fafafa;
}
</style>
