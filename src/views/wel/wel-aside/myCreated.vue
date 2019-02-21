<template>
  <div class="created">
    <div class="title">{{creatList.title}}</div>
    <div class="created-content">
      <div class="handelCreate" v-for="(item,index) in creatList.details" :key="index">{{item}}</div>
      <div class="add" @click="handelAdd"><i class="el-icon-plus"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      creatList: { title: '我要创建', details: ['纪要', '报表', '材料', '任务', '审批', '建议', '感想', '邮件', '考试', '调研', '建模'] },
    }
  },
  methods: {
    //创建标签事件
    handelCreate () {

    },
    //+添加事件
    handelAdd () {

    },
  },
}
</script>
<style  lang="scss" scoped>
.created-content {
  display: grid;
  grid-template-columns: auto auto auto auto;
  text-align: center;
  background: #ececec;
  grid-gap: 1px;
  div {
    padding: 10px 0;
    background-color: #fafafa;
    cursor: pointer;
    &:hover {
      color: #cb132d;
    }
  }
}
.title {
  padding: 10px 0;
  font-size: 16px;
  font-weight: 500;
}
</style>


