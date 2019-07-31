<template>
  <el-col :span="6" class="module-item">
    <div class="module-con" :class="moduleClass">
      <span v-if="isBasic" class="btn basics">基础</span>
      <span v-if="item.enable===1" class="btn"><i class="right el-icon-check"></i></span>
      <i class="icon iconfont" :class="item.logo"></i>
      <span class="text">{{item.name}}</span>
    </div>
  </el-col>
</template>
<script>
export default {
  name: 'IepGomsModule',
  props: {
    item: {
      type: Object,
      required: true,
    },
    isTest: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isBasic () {
      return false
    },
    moduleClass () {
      if (this.isTest === 1) {
        return 'module-con-test'
      } else {
        return 'module-con-operable'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.module-item {
  display: inline-block;
  .module-con {
    position: relative;
    margin: 15px 5px;
    padding: 10px;
    text-align: center;
    border: 1px solid #d7d7d7;
    border-radius: 3px;
    background-color: #fff;
    color: #d7d7d7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .icon {
      display: block;
      font-size: 34px;
    }
    .btn.basics {
      top: 15px;
      left: 0;
      width: 38px;
      height: 22px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      border-radius: 0 20px 20px 0;
      background-color: #bf051a;
      border-color: #bf051a;
      color: #fff;
    }
    .text {
      display: block;
      margin-top: 10px;
      font-size: 14px;
    }
  }
  .module-con-test {
    color: #666;
    border-color: #999;
    i,
    span {
      color: #666;
    }
    &:hover {
      box-shadow: 0 0 3px 5px #eee;
    }
  }
  .module-con-operable {
    border-color: #bf051a;
    //background-color: #fff2f4;
    color: #bf051a;
    .text {
      color: #bf051a;
    }
    .btn {
      border: #bf051a;
      // background-color: #bf051a;
      .close,
      .add,
      .right {
        color: #bf051a;
      }
    }
    &:hover {
      box-shadow: 0 0 3px 5px #eee;
    }
    .btn {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 16px;
      height: 16px;
      cursor: pointer;
      display: block;
      border: 1px solid #bf051a;
      border-radius: 50%;
      transition: all 0.8s ease-out;
    }
    .close,
    .add,
    .right {
      display: block;
      padding: 1px;
      font-size: 12px;
      color: #888;
    }
  }
}
</style>
