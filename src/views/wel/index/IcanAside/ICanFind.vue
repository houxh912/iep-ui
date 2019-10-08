<template>
  <i-can-content class="my-content" title-name="我要找">
    <template v-slot:stitle>
      <div class="sub-title" @click="getMore">
        <span>更多</span>
        <span><i class="el-icon-d-arrow-right"></i></span>
      </div>
    </template>
    <div class="my-wrapper">
      <div class="cursor" v-for="(item,index) in findList" :key="index" @click="item.callback()">
        <div class="icon"><i :class="item.icon"></i></div>
        <div class="subtitle">{{item.subtitle}}</div>
      </div>
    </div>
  </i-can-content>
</template>
<script>
import ICanContent from './ICanContent'
export default {
  components: { ICanContent },
  data () {
    return {
      findList: [
        { icon: 'icon-xiangmu', subtitle: '项目', callback: () => { this.$message('功能正在开发中') } },
        { icon: 'icon-shangjifaxian', subtitle: '商机', callback: () => { this.$message('功能正在开发中') } },
        { icon: 'icon-peixun', subtitle: '培训', callback: () => { this.$message('功能正在开发中') } },
        { icon: 'icon-shifu', subtitle: '师父', callback: () => { this.$openPage('/wel/master') } },
      ],
    }
  },
  methods: {
    getMore () {
      this.$openPage('/app/resource/material')
    },
  },
}
</script>
<style lang="scss" scoped>
.sub-title {
  font-size: 12px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: $--menu-color-primary;
  }
}
.subtitle {
  font-size: 14px;
}
.my-wrapper {
  display: flex;
  justify-content: center;
}
.my-content {
  .cursor {
    cursor: pointer;
    flex-grow: 1;
    text-align: center;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    &:hover {
      opacity: 0.6;
    }
  }
  .icon {
    padding: 10px 0 0;
    i {
      font-size: 24px !important;
    }
    .icon-fangan {
      color: #459fb9;
    }
    .icon-shangjifaxian {
      color: #5d78a5;
    }
    .icon-peixun {
      color: #c68b52;
    }
    .icon-shifu {
      color: #cb8082;
    }
  }
}
</style>


