<template>
  <div class="process-schedule">
    <span class="sub-title">{{title}}</span>
    <el-steps :active="2" align-center>
      <el-step :title="step.title" v-for="step in stepList" :key="step.id" :description="step.description"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '流程进度',
      stepList: [
        {
          title: '创建投资',
          description: '何益挺 / 2019-05-06 10:00',
        },
        {
          title: '资产委员会核准',
          description: '黄磊 / 2019-05-07 10: 00',
        },
        {
          title: '募集',
          description: '何益挺 / 2019-05-08 10:00',
        },
        {
          title: '完成',
          description: '何益挺 / 2019-05-09 10:00',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.process-schedule {
  margin-bottom: 40px;
  .sub-title {
    display: block;
    margin-bottom: 20px;
    font-size: 15px;
  }
}
</style>

<style lang="scss" scoped>
.process-schedule ::v-deep .el-step__icon-inner {
  display: none;
}
.process-schedule ::v-deep .el-step__main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.process-schedule ::v-deep .el-step__main:hover .el-step__description {
  opacity: 1;
}
.process-schedule ::v-deep .el-step__icon {
  width: 10px;
  height: 10px;
  border-color: #ccc;
  background-color: #ccc;
}
.process-schedule ::v-deep .el-step.is-center .el-step__line {
  border-style: dashed;
  border-color: #ccc;
  background: none;
  border-width: 1px;
}
.process-schedule ::v-deep .el-step__line-inner {
  border: 0;
  background: none;
}
.process-schedule ::v-deep .el-step__head.is-finish .el-step__icon {
  width: 14px;
  height: 14px;
  border-color: $--menu-color-primary;
  background: $--menu-color-primary;
}
.process-schedule ::v-deep .el-step__head.is-finish .el-step__line {
  border-color: $--menu-color-primary;
}
.process-schedule ::v-deep .el-step__title.is-process {
  font-weight: 400;
}
.process-schedule ::v-deep .el-step__title {
  font-size: 14px;
}
.process-schedule ::v-deep .el-step__description {
  position: relative;
  opacity: 0;
  margin-top: 5px;
  padding: 10px;
  width: 200px;
  font-size: 14px;
  letter-spacing: 0.5px;
  border: 1px solid #eee;
  color: #333;
  transition: all 0.5s;
}
.process-schedule ::v-deep .el-step__description:before {
  content: "";
  position: absolute;
  left: 96px;
  top: -10px;
  width: 11px;
  height: 11px;
  background: url(./img/jiao.jpg) no-repeat;
}
</style>


