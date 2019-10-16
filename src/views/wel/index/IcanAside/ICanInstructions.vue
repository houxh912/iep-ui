<template>
  <i-can-content class="my-content" title-name="领导批示">
    <div class="my-wrapper">
      <iep-no-data v-if="!dataList.length"></iep-no-data>
      <div class="title-con" v-for="item in dataList" :key="item.id">
        <span class="title" @click="$openPage(`/mlms_spa/email/detail/${item.id}`)">{{item.name}}</span>
        <span class="time">{{item.time}}</span>
      </div>
      <slot></slot>
    </div>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
import { getInstructionsList } from '@/api/wel/et'
export default {
  components: { ICanContent },
  data () {
    return {
      dataList: [],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getInstructionsList()
      this.dataList = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.title-con {
  display: flex;
  line-height: 26px;
  justify-content: space-between;
  &:hover span {
    color: #cb132d;
    cursor: pointer;
  }
  &:nth-child(1) {
    margin-top: 15px;
  }
}
.title {
  flex: 2;
  font-size: 14px;
  color: #666;
  margin: 0 4px;
  height: 22px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.iconfont {
  margin-left: 5px;
  color: #999;
  cursor: pointer;
}
</style>
<style scoped>
.index-card >>> .el-card__header {
  padding: 18px 0 18px;
}
.index-card >>> .el-card__body {
  padding: 15px 0;
}
.el-card {
  padding: 0 15px !important;
}
</style>


