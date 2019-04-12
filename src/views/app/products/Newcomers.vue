<template>
  <div>
    <iepAppTabCard :title="title">
      <div class="newcomersList">
        <div v-for="(item,index) in newcomersList" :key="index" class="piece">
          {{item}}
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '新人必读',
      newcomersList: [
        '国脉集团新员工入职指南',
        '国脉商务礼仪规范与工作守则',
        '内网个人风采页完善指标项及信息填写规范',
        '公司文化内容的最新修订稿pdf（新生必读）',
        '山东省营商环境评估指标',
        '智慧城市发展趋势（无锡会议）-杨冰之',
        '2019年北京国脉互联开票通知单（模版）201904',
        '数据基因白皮书V8.0'],
    }
  },
}
</script>
<style lang="scss" scoped>
.newcomersList {
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    position: relative;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
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
