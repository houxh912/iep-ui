<template>
  <div class="album">
    <div class="title">{{data.title}}</div>
    <el-carousel indicator-position="outside" class="content" @change="handleChange">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <iep-img :src="item.imageUrl"></iep-img>
        <div>{{item.title}}</div>
      </el-carousel-item>
    </el-carousel>
    <div class="content">{{data.synopsis}}</div>
  </div>
</template>
<script>
import { geOrgPage } from '@/api/goms/org_album'
export default {
  data () {
    return {
      list:[],
      data: {},
    }
  },
  methods:{
    loadPage () {
      geOrgPage({ current: 1, size: 100, orgId: this.$route.query.id }).then(({data}) => {
        if (data.data) {
          this.list = data.data.records
        }
      })
    },
    handleChange (val) {
      this.data = this.list[val]
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style scoped>
.album {
  padding-bottom: 40px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;

}
.content {
  padding: 0 20px;
}
.el-carousel__item {
  border: 1px solid #ddd;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.album >>> .el-carousel__container {
  position: relative;
  width: 900px;
  height: 540px;
  margin: auto;
}
</style>
