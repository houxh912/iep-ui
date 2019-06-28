<template>
    <el-carousel indicator-position="outside" class="content">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <iep-img :src="item.imageUrl"></iep-img>
        <div>{{item.title}}</div>
      </el-carousel-item>
    </el-carousel>
</template>
<script>
import { geOrgPage } from '@/api/goms/org_album'
export default {
  data () {
    return {
      list:[],
    }
  },
  methods:{
    loadPage () {
      geOrgPage({ current: 1, size: 100 }).then(({data}) => {
        if (data.data) {
          this.list = data.data.records
        }
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style scoped>
.content {
  padding: 0 20px;
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
</style>
