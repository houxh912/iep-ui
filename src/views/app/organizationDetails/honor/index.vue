<template>
  <div class="whole">
    <div class="whole-box" v-for="(item,index) in wholeList" :key="index">
      <div class="whole-item">
        <iep-img :src="item.image" alt=""></iep-img>
      </div>
      <p>{{item.description}}</p>
    </div>
  </div>
</template>

<script>
import { getHonorList } from '@/api/app/mlms/honor'
export default {
  data () {
    return {
      wholeList: [],
    }
  },
  created () {
    getHonorList(this.$route.query.id).then(({ data }) => {
      this.wholeList = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.whole {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  flex-wrap: wrap;
  .whole-box {
    margin-bottom: 20px;
    width: 23%;
    cursor: pointer;
    .whole-item {
      height: 280px;
      border: 1px solid #ebeef5;
      img {
        width: 272px;
        height: 100%;
      }
    }
    p {
      margin-top: 5px;
      padding: 0 10px;
      font-size: 14px;
      color: #333;
      text-align: center;
    }
  }
}
</style>
<style scoped>
.whole >>> .el-image {
  display: flex;
  padding: 5px;
  align-items: center;
  width: 100%;
  height: 100%;
}
.whole >>> .el-image__inner {
  max-height: 100%;
  height: auto;
}
</style>


