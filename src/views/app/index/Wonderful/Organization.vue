<template>
  <div class="organization">
    <el-carousel height="200px" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/3)" :key="index">
        <div class="piece" v-for="(t, i) in wonderfulList.slice(index*3, index*3+3)" :key="i" @click="handleOpen(t)">
          <div class="img">
            <iep-img :src="t.logo" class="img"></iep-img>
          </div>
          <span class="name">{{t.org_name}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getRectagsOrgList } from '@/api/app/upms/'

export default {
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    handleOpen (row) {
      this.$router.push({
        path: `/app/organization_style/${row.org_id}`,
      })
    },
  },
  created () {
    getRectagsOrgList().then(({ data }) => {
      this.wonderfulList = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.organization {
  .piece {
    text-align: center;
    width: 268px;
    float: left;
    margin: 0 5px;
    cursor: pointer;
    .img {
      width: 100%;
      height: 165px;
      overflow: hidden;
      img {
        width: 100%;
        height: 165px;
        transition: 0.5s;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
      }
    }
    .name {
      display: block;
      line-height: 50px;
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
.organization >>> .el-image__inner {
  width: 100%;
  height: 165px;
  transition: 0.5s;
}
.organization >>> .el-image__inner:hover {
  cursor: pointer;
  transform: scale(1.1);
}
</style>

