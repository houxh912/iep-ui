<template>
  <div class="certificate">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div v-if="dataList.length !== 0">
        <el-carousel :interval="4000" type="card" height="260px" :autoplay="false" indicator-position="none">
          <el-carousel-item v-for="(item,index) in dataList" :key="index">
            <div class="certificate-item" @click="openImg(item)">
              <iep-img :src="item.annex" alt=""></iep-img>
              <span class="title">{{item.name}}</span>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
    <iep-image-dialog ref="ImageDialog"></iep-image-dialog>
  </div>
</template>

<script>
import { getCertificateList } from '@/api/app/hrms/'

export default {
  data () {
    return {
      title: '个人证书',
      dataList: [
      ],
      linkName: '/app/resource/qualification',
    }
  },
  methods: {
    openImg (val) {
      this.$refs['ImageDialog'].information = val
      this.$refs['ImageDialog'].dialogShow = true
    },
  },
  created () {
    getCertificateList().then(({ data }) => {
      this.dataList = data.data
      console.log(data.data)
    })
  },
}
</script>

<style lang="scss" scoped>
.certificate {
  .certificate-item {
    height: 260px;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    img {
      width: 152px;
      height: 230px;
    }
    .title {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
}
</style>
<style scoped>
.certificate >>> .el-card {
  height: 364px;
}
.certificate >>> .el-image {
  display: flex;
  align-items: center;
  width: 100%;
  height: 230px;
}
.certificate >>> .el-image__inner {
  max-height: 100%;
  height: auto;
  border: 1px solid #ebeef5;
}
.certificate >>> .el-carousel__item--card.is-active {
  width: 64%;
  margin-left: -7%;
}
</style>
