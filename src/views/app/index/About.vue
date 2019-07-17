<template>
  <div class="about">
    <IepAppTabCard :title="title" :linkName="linkName">
      <div>
        <p class="about-text">国脉集团是中国领先的大数据治理和数据服务专业机构。创新提出“软件+咨询+平台+数据+创新...</p>
        <div class="about-list">
          <div v-for="(item, index) in dataList" :key="index" class="piece" @click="handleDetail(item)">
            {{item.name}}
          </div>
        </div>
      </div>
    </IepAppTabCard>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '关于国脉',
      dataList: [
        {
          name: '集团概况',
          path: 'group',
        },
        {
          name: '企业文化',
          path: 'culture',
        },
        {
          name: '组织架构',
          path: 'mechanism',
        },
        {
          name: '专家团队',
          path: 'team',
        },
        {
          name: '发展历程',
          path: 'development',
        },
        {
          name: '业务领域',
          path: 'business',
        },
      ],
      // 更多的跳转地址
      linkName: '/app/alliance_details',
    }
  },
  methods: {
    handleDetail (item) {
      this.$router.push(`/app/alliance_details/${item.path}`)
    },
  },
}
</script>
<style lang="scss" scoped>
.about-text {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-align: justify;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.about-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  .piece {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    color: #333;
    transition: 0.5s;
    &:hover {
      background-color: #cb3737;
      color: #fff;
    }
  }
}
</style>
<style scoped>
.about >>> .el-card {
  height: 288px;
}
</style>
