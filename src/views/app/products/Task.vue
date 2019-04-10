<template>
  <div class="task">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="cardTitle" style="font-size:18px;" >{{title}}</span>
        <el-button style="float: right; padding: 5px 0; color:#cb3737;" type="text">产品与技术委员会></el-button>
      </div>
      <div>
        <div class="taskList">
            <el-table :data="tableData" style="width: 100%" size=medium  >
                <el-table-column prop="name" label="任务名称"></el-table-column>
                <el-table-column prop="process" label="进度" width="180">
                    <el-progress :percentage="20" color="#68C769"></el-progress>
                </el-table-column>
                <el-table-column prop="principal" label="负责人" width="80"></el-table-column>
            </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '十大任务',
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
.taskList{
  .piece{
    cursor: pointer;
    height:30px;
    line-height: 30px;
    text-align: center;
    &:hover{
      color: #cb3737;
    }
  }
}
</style>
