<template>
  <div class="baner">
    <el-carousel :interval="5000" class="index-card">
      <el-carousel-item v-for="(item,index) in img" :key="index" class="baner-box">
        <iep-img :src="item.image" class="img" @click.native="handleDetail(item)"></iep-img>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getListBySiteId } from '@/api/conm/article_controller'
export default {
  data () {
    return {
      img: [],
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/app/news/news_detail/${row.id}`)
    },
  },
  created () {
    getListBySiteId({
      attributeNumber: 'indexrec',
      siteId: 1,
    }).then(({ data }) => {
      this.img = data.data
    })
  },
}
</script>
<style scoped>
.el-carousel >>> .el-carousel__container {
  height: 280px;
}
</style>

<style lang="scss" scoped>
.index-card {
  height: 280px;
  .baner-box {
    height: 280px;
    .img {
      width: 100%;
      height: 280px;
    }
  }
}
</style>
