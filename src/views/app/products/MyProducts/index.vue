<template>
  <div class="my-products">
    <basic-container>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='MyProdect'" v-slot:MyProdect>
          <my-prodect v-loading="activeTab !=='MyProdect'"></my-prodect>
        </template>
        <template v-if="activeTab ==='MyModule'" v-slot:MyModule>
          <my-module v-loading="activeTab !=='MyModule'"></my-module>
        </template>
      </iep-tabs>
    </basic-container>
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
          label: '产品目录',
          value: 'MyProdect',
        }, {
          label: '系统模块',
          value: 'MyModule',
        },
      ],
      activeTab: 'MyProdect',
    }
  },
}
</script>
<style scoped lang='scss'>
.my-products {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: center;
  border: 1px solid #eee;
}
</style>

