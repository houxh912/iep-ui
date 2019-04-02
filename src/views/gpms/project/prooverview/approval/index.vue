<template>
  <basic-container>
    <page-header title="详情" :backOption="backOption"></page-header>
    <div class="content">
      <div class="left">
        <el-card class="box-card">
          <div class="navigation" 
            :class="selectNavigation===item.value?'selectNavigation':''" 
            v-for="item in selectNavigatList" 
            :key="item.value"
            @click="navigationChosen(item)">{{item.name}}</div>
        </el-card>
      </div>
      <div class="right">
        <detailPage></detailPage>
      </div>
    </div>
  </basic-container>
</template>

<script>
import detailPage from './detail/index'

export default {
  name: 'detail',
  components: { detailPage },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$router.go(-1)
        },
      },
      selectNavigation: 0,
      selectNavigatList: [
        { name: '概况', value: 0 },
        { name: '立项阶段', value: 1 },
        { name: '项目材料', value: 2 },
      ],
    }
  },
  methods: {
    close () {
      
    },
    // 导航切换
    navigationChosen (item) {
      this.selectNavigation = item.value
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  .left {
    width: 200px;
    .navigation {
      margin-bottom: 20px;
      cursor: pointer;
    }
    .selectNavigation {
      color: #cb3737
    }
  }
  .right {
    flex: 1;
  }
}
</style>

