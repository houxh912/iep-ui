<template>
  <div class="tab">
    <div class="tabList" @click="tab(0,0)">
      <span class="title" :class="showClass==0?'color':''">师徒</span>
      <span class="line">/</span>
    </div>
    <div class="tabList" @click="tab(1,1)">
      <span class="title" :class="showClass==1?'color':''">我的关注</span>
      <span class="line">/</span>
    </div>
    <div class="tabList" v-for="(item,index) in navList" :key="index" @click="tab(index+2,index+2)">
      <span class="title" :class="showClass==index+2?'color':''">{{item.name}} </span>
      <span class="line" :class="index==navList.length-1?'showLine':''">/</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showClass: 0,
    }
  },
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    tab (val1, val2) {
      this.showClass = val1
      this.$emit('tab', val2)
    },
  },
}
</script>

<style lang="scss" scoped>
.tabList {
  display: inline-block;
  color: #919191;
  font-size: 16px;
  .title {
    cursor: pointer;
    color: #666;

    &:hover {
      color: $--menu-color-primary;
    }
  }
  .line {
    padding: 0 10px;
  }
  .color {
    color: $--menu-color-primary;
  }
  .showLine {
    display: none;
  }
}
</style>
