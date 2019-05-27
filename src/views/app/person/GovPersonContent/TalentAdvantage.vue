<template>
  <div class="training-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data">
      <div class="training-notice">
        <div class="item" v-for="(item, index) in list" :key="index">
          <i :class="item.icon"></i>
          <div>{{item.name}}</div>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '人才优势',
      data: '',
      linkName: '/app/resource/material',
      list: [
        {
          name: '项目团队230人',
          icon: 'icon-qingdan',
        },
        {
          name: '产品团队43人',
          icon: 'icon-fangan',
        },
        {
          name: '技术团队60人',
          icon: 'icon-gongzuotai1',
        },
        {
          name: '平台运营21人',
          icon: 'icon-diannaodenglu ',
        },
        {
          name: '外部证书280个',
          icon: 'icon-qingdankushoucang',
        },
        {
          name: '本科及以上学历210人',
          icon: 'icon-lianxiren',
        },
      ],
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
.training-notice {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
    height: calc(350px / 3);
    text-align: center;
    border-bottom: 1px solid #eee;
    padding-top: 20px;
    i {
      font-size: 30px;
    }
  }
  .item:nth-child(odd) {
    border-right: 1px solid #eee;
    padding-right: 10px;
  }
  .item:nth-child(even) {
    padding-left: 10px;
  }
  .item:nth-child(5), .item:nth-child(6) {
    border-bottom: 0px;
  }
}
</style>
<style scoped>
.training-con >>> .el-card__body {
  height: 378px;
}
</style>
