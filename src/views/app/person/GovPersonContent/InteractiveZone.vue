<template>
  <div class="zone">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="dynamic-list">
        <div v-for="(item,index) in dynamicList" :key="index" class="piece">
          <span>{{item.tip}}</span><span>{{item.text}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '互动专区',
      data: '（15次）',
      dynamicList: [{ tip: '【评选】', text: '2018年度国脉精彩瞬间评选' }, { tip: '【评选】', text: '优秀员工评选' }, { tip: '【评选】', text: '最美国脉人活动评选' }, { tip: '【调研】', text: '关于财富动态分配的调查问卷' }, { tip: '【调研】', text: '关于公司产品模块化开发的意见征集' }, { tip: '【调研】', text: '国脉物联网两大研究中心' }, { tip: '【调研】', text: '国脉物联网3.0版上线' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.dynamic-list {
  .piece {
    cursor: pointer;
    height: 32.5px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      color: #cb3737;
    }
  }
}
</style>

<style scoped>
.zone >>> .el-card__body {
  height: 270px;
}
</style>
