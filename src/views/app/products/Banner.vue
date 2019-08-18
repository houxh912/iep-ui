<template>
  <div class="banner">
    <el-carousel :interval="5000">
      <el-carousel-item v-for="(item,index) in note" :key="index">
        <div class="baner-img" :style="item" @click="open(item.url,item.name)">
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="new-dynamic">
      最新动态：
      <div class="box">
        <div v-for="(item,index) in newDynamic.slice(0, 3)" :key="index" class="new-dynamic-list" @click="details(item.id)">
          <span class="time">{{item.secondClassName}}</span>
          <span class="desc">{{item.name}}</span>
          <i class="iconfont icon-dingyue"></i>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { openWindow } from '@/util/util'
import { getNewsList } from '@/api/app/mlms/index'
export default {
  data () {
    return {
      note: [
        {
          backgroundImage: 'url(' + require('./img/banner2.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          url: 'http://www.datadnas.com/',
          name: '数据基因',
        },
        {
          backgroundImage: 'url(' + require('./img/banner3.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          url: 'http://gc.govmade.cn/',
          name: '国策',
        },
        {
          backgroundImage: 'url(' + require('./img/banner4.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          url: 'https://www.govmade.com/yingst/',
          name: '营商通',
        },
      ],
      newDynamic: [
        { secondClassName: '03.10', name: '191内网2.0项目正式启动' },
        { secondClassName: '03.10', name: '营商通微服务版专家评审上海通过' },
        { secondClassName: '03.10', name: '北京新城区正式进入需求调研' },
      ],
    }
  },
  methods: {
    open (val, name) {
      openWindow(`${val}`, `${name}`, 800, 600)
    },
    details (val) {
      this.$router.push({
        path: `/app/resource/material/material_detail/${val}`,
      })
    },
  },
  created () {
    getNewsList().then(({ data }) => {
      this.newDynamic = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.banner {
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: #f8f8f8;
  .baner-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-position: center;
  }
  .new-dynamic {
    width: 1200px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    display: flex;
    .box {
      width: 1100px;
      display: grid;
      grid-auto-flow: row dense;
      grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(
          100px,
          1fr
        );
      .new-dynamic-list {
        cursor: pointer;
        .time {
          float: left;
          margin-right: 5px;
        }
        > i {
          float: left;
          margin-left: 5px;
        }
        .desc {
          float: left;
          max-width: 270px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
<style scoped>
.el-carousel >>> .el-carousel__container {
  height: 330px;
}
</style>
