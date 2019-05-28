<template>
  <div>
    <div class="breadcrumb-wrapper">
      <el-breadcrumb class="breadcrumb-item" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in routerMatch" :key="item.path" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="material">
      <div class="library">
        <boleForm></boleForm>
      </div>
      <div class="piece">
        <IepAppTabCard :title="labelTitle">
          <IepAppListCard :dataList="labelList" name="positionName"></IepAppListCard>
        </IepAppTabCard>
      </div>
    </div>
  </div>
</template>

<script>
import boleForm from './boleForm'
import { getPostList } from '@/api/app/hrms/'

export default {
  components: { boleForm },
  data () {
    return {
      labelTitle: '推荐岗位',
      labelList: [],
      dataList: [],
      routerMatch: [
        {
          path: '/app/index',
          name: '首页',
        }, 
        {
          path: '/app/person',
          name: '国脉人',
        },
        {
          path: '/app/tobeBole',
          name: '争做伯乐',
        },
      ],
    }
  },
  methods: {
    // 推荐岗位
    getRectagsList () {
      getPostList().then(({data}) => {
        this.labelList = data.data
      })
    },
  },
  created () {
    this.getRectagsList()
  },
}
</script>
<style lang="scss" scoped>
.breadcrumb-wrapper {
  .breadcrumb-item {
    margin: 20px auto 0;
    width: 1200px;
    padding: 0 0 20px 20px;
  }
}
.material {
  width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #eee;
  display: grid;
  grid-auto-flow: row dense;
  grid-template-columns: minmax(100px, 9000px) minmax(100px, 300px);
}
.ranking {
  padding: 0;
}
.el-card{
  border:0;
}
.library{
  padding-right: 20px;
  border-right: 1px solid #EBEEF5;
}
</style>
