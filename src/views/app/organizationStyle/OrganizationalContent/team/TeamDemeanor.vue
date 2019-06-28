<template>
  <div class="empolyee">
    <el-carousel height="" :interval="5000" indicator-position="none">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/3)" :key="index">
        <div v-for="(t,i) in wonderfulList" :key="i" class="piece">
          <div class="imgs">
            <iep-img :src="t.imageUrl" class="img"></iep-img>
          </div>
          <span class="name">{{t.title}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { geOrgPage } from '@/api/goms/org_album'
export default {
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    loadPage () {
      geOrgPage({ current: 1, isze: 20 }).then(({data}) => {
        if (data.data) {
          this.wonderfulList = data.data.records
        }
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    float: left;
    margin: 0 5px;
    width: 240px;
    text-align: center;
    overflow: hidden;
    height: 100%;
    .imgs {
      width: 100%;
      height: 180px;
      overflow: hidden;
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
      line-height: 40px;
    }
    &:first-child {
      margin: 0 15px 0 10px;
    }
    &:last-child {
      margin: 0 10px 0 15px;
    }
  }
}
</style>