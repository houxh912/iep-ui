<template>
  <div class="products-services-con">
    <iepAppTabCard :title="title" :linkName="linkName" isMore>
      <div class="products-services">
        <div v-for="(item,index) in productsServices" :key="index" class="piece">
          <span class="name">{{item.name}}</span>
          <span class="operate">{{item.operate}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '产品与服务',
      productsServices: [
        { name: '国脉信息资源库管理系统', operate: '申请代理' },
        { name: '统一用户管理系统', operate: '申请代理' },
        { name: '数据基因系统', operate: '申请代理' },
        { name: '营商通', operate: '申请代理' },
        { name: '数据清洗系统', operate: '申请代理' }],
      linkName: '',
    }
  },
}
</script>
<style lang="scss" scoped>
.products-services-con {
  margin-bottom: 30px;
}
.products-services {
  .piece {
    cursor: pointer;
    position: relative;
    .name {
      display: inline-block;
      width: 200px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .operate {
      opacity: 0;
      float: right;
      padding: 0 5px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      border: 1px solid #cb3737;
      border-radius: 4px;
      background-color: #fff;
      color: #cb3737;
      transition: all 0.5s;
    }
    &:hover {
      .operate {
        opacity: 1;
      }
    }
  }
}
</style>
<style scoped>
.products-services-con >>> .el-card__body {
  height: 209px;
}
</style>
