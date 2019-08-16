<template>
  <div class="empolyee">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/4)" :key="index">
        <div class="piece" v-for="(t, i) in wonderfulList.slice(index*4, index*4+4)" :key="i" @click="handleDetail(t.orgId)">
          <div class="img">
            <iep-img v-if="t.imageUrl" :src="t.imageUrl" class="img"></iep-img>
            <img v-else src="./img/organization.png" class="img">
          </div>
          <span class="name">{{t.orgName}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getAlbumList } from '@/api/app/upms/'

export default {
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    loadList () {
      getAlbumList().then(({ data }) => {
        this.wonderfulList = data.data
      })
    },
    handleDetail (orgId) {
      this.$router.push(`/app/organization_details/album?id=${orgId}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.empolyee {
  .piece {
    text-align: center;
    width: 238px;
    float: left;
    margin: 0 17px;
    cursor: pointer;
    .img {
      width: 100%;
      height: 142px;
      overflow: hidden;
      img {
        width: 100%;
        height: 142px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      line-height: 40px;
    }
    &:first-child {
      margin: 0 27px 0 22px;
    }
    &:last-child {
      margin: 0 22px 0 27px;
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-carousel__container {
  height: 180px;
}
.empolyee >>> .el-image__inner {
  width: 100%;
  height: 142px;
  transition: 0.5s;
}
.empolyee >>> .el-image__inner:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>