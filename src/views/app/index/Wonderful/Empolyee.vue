<template>
  <div class="empolyee">
    <el-carousel height="200px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/4)" :key="index">
        <div class="piece" v-for="(t, i) in wonderfulList.slice(index*4, (index+1)*4)" :key="i" @click="handleOpen(t)">
          <div class="img">
            <iep-img :src="t.avatar" class="img"></iep-img>
          </div>
          <span class="name">{{t.name}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getRecruitDetailPage } from '@/api/app/hrms/'
export default {
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    handleOpen (row) {
      this.$router.push({
        path: `/app/personal_style/${row.id}`,
      })
    },
  },
  created () {
    getRecruitDetailPage({
      current: 1,
      size: 20,
      type: 1,
    }).then(({ data }) => {
      this.wonderfulList = data.data.records
    })
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  .piece {
    text-align: center;
    width: 198px;
    float: left;
    margin: 0 5px;
    cursor: pointer;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      border:1px solid #ebeef5;
      img {
        width: 100%;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      display: block;
      line-height:50px;
      height: 30px;
    }
    &:first-child {
      margin: 0 15px 0 0;
    }
    &:last-child {
      margin: 0 -1px 0 15px;
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-image__inner {
  width: 100%;
  transition: 0.5s;
}
.empolyee >>> .el-image__inner:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>
