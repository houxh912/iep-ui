<template>
  <div class="my-products">
    <IepAppTabsCard>
      <el-button class="publish" slot="left" type="text" @click="custom">产品定制</el-button>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='MyModule'" v-slot:MyModule>
          <my-module v-loading="activeTab !=='MyModule'"></my-module>
        </template>
        <template v-if="activeTab ==='MyProdect'" v-slot:MyProdect>
          <my-prodect v-loading="activeTab !=='MyProdect'"></my-prodect>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import MyModule from './MyModule'
import MyProdect from './MyProdect'
export default {
  components: {
    MyModule,
    MyProdect,
  },
  data () {
    return {
      tabList: [
        {
          label: '产品模块',
          value: 'MyModule',
        },
        {
          label: '组合系统',
          value: 'MyProdect',
        },
      ],
      activeTab: 'MyModule',
    }
  },
  methods: {
    custom () {
      this.$router.push('/cpms/modules')
    },
  },
}
</script>
<style scoped lang='scss'>
.my-products {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;    
  height: 390px;
  overflow: hidden;
}
.publish {
  position: absolute;
  top: 4px;
  right: 10px;
  line-height: 50px;
  padding: 0;
  color: #cb3737;
  z-index: 3;
  transition: all 0.5s;
  &:hover {
    opacity: 0.7;
  }
}
</style>
