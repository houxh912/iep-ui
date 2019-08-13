<template>
  <div class="bulleted-list">
    <el-card class="index-card" shadow="never">
      <div slot="header" class="title-con clearfix">
        <span class="title">
          {{title}}
        </span>
        <slot name="statistics"></slot>
        <el-button class="btn" type="text" @click="getMore">更多></el-button>
        <slot name="right"></slot>
      </div>
      <el-scrollbar style="height:240px">
        <div class="bulleted-item" @click="handleDetail(item)" v-for="(item,index) in dataList" :key="index">
          <span class="sub-item">{{item.project_name}}</span>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script>
import { getProjectRecProjects } from '@/api/app/prms/'
export default {
  data () {
    return {
      title: '项目列表',
      linkName: '',
      dataList: [
      ],
    }
  },
  created () {
    this.linkName = '/wel/budget_list_detail'
    getProjectRecProjects().then(({ data }) => {
      this.dataList = data.data.list
    })
  },
  methods: {
    getMore () {
      this.$router.push({
        path: this.linkName,
      })
    },
     handleDetail (row) {
      this.$router.push(`/gpms_spa/project/detail/${row.id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.title-con {
  display: flex;
  justify-content: space-between;
}
.title {
  flex: 2;
  font-size: 16px;
  color: #303133;
  margin: 0 4px;
  height: 22px;
  line-height: 22px;
}
.btn {
  margin-right: 5px;
  padding: 0;
  height: 22px;
  line-height: 22px;
  color: #999;
  cursor: pointer;
}
.datas {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
}
.bulleted-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  line-height: 32px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  .sub-item {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: $--menu-color-primary;
    }
  }
}
.bulleted-list .el-card {
  padding: 0 20px;
}
</style>
<style scoped>
.el-card {
  padding: 0 20px;
}
.bulleted-list >>> .el-card {
  height: 351px;
}
.bulleted-list >>> .title {
  font-size: 18px;
}
.bulleted-list >>> .el-card__header {
  padding: 18px 0 18px;
}
.bulleted-list >>> .el-progress__text i {
  display: none;
}
.bulleted-list >>> .el-progress-bar {
  padding-right: 0;
}
.bulleted-list >>> .el-progress {
  line-height: 1.8;
}
.bulleted-list >>> .title {
  font-size: 16px;
}
.bulleted-list >>> .el-card__header,
.bulleted-list >>> .el-card__body {
  padding: 18px 0;
}
</style>
