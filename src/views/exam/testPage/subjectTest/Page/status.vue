<template>
  <div class="status">
    <template v-if="exam.status !== 1 && exam.examStatus === 7  && exam.status!==3">
      <el-tag type="" class="states-1" size="mini">已报名</el-tag>
    </template>

    <template
      v-if="exam.status === 1 && (exam.examStatus === 8 || exam.examStatus === 7 || exam.examStatus === 3 || exam.examStatus === 0)">
      <el-tag type="danger" class="states-2" size="mini">进行中</el-tag>
    </template>

    <template v-if="exam.examStatus === 5 && exam.status!==3">
      <el-tag type="info" class="states-3" size="mini">未报名</el-tag>
    </template>

    <template v-if="exam.status === 3 ">
      <el-tag type="info" class="states-3" size="mini">已结束</el-tag>
    </template>

    <template v-if="exam.examStatus === 2 && exam.status!==3">
      <el-tag type="success" class="states-4" size="mini">已完成</el-tag>
    </template>

    <template v-if="exam.examStatus === 1 && exam.status === 1 && exam.status!==3">
      <el-tag type="warning" class="states-5" size="mini">已取消资格</el-tag>
    </template>
  </div>
</template>

<script>
export default {
  props: ['exam'],
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.exam)
  },
}
</script>

<style lang="scss" scoped>
.status {
  position: absolute;
  right: 8px;
  top: 8px;

  > span {
    color: #fff;
    border-radius: 2px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  }

  .states-1 {
    background: #f44336;
  }
  .states-2 {
    background: #67c23a;
  }
  .states-3 {
    background: #909399;
  }
  .states-4 {
    background: #409eff;
  }
  .states-5 {
    background: #e6a23c;
  }
}
</style>

