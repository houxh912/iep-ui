<template>
  <div class="empolyee">
    <el-carousel height="" :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in Math.ceil(wonderfulList.length/4)" :key="index">
        <div v-for="(t, i) in wonderfulList.slice(index*4, (index + 1)*4)" :key="i" class="piece">
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
  props: {
    orgId: {
      default: 0,
    },
  },
  data () {
    return {
      wonderfulList: [],
    }
  },
  methods: {
    loadPage (id) {
      geOrgPage({ current: 1, size: 20, orgId: id }).then(({ data }) => {
        if (data.data) {
          this.wonderfulList = data.data.records
        }
      })
    },
  },
  created () {
    this.loadPage(this.orgId)
  },
  watch: {
    orgId (newVal) {
      this.loadPage(newVal)
    },
  },
}
</script>
<style lang="scss" scoped>
.empolyee {
  padding-top: 15px;
  .piece {
    float: left;
    margin: 0 17px;
    width: 238px;
    text-align: center;
    overflow: hidden;
    height: 100%;
    .imgs {
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
      margin: 0 27px 0 27px;
    }
  }
}
</style>
<style scoped>
.empolyee >>> .el-carousel__container {
  height: 180px;
}
</style>