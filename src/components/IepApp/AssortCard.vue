<template>
  <div class="assort">
    <div v-for="(item,index) in dataList" :key="index" class="piece" @click="handleDetail(item)">
      <span class="assort">{{item[title]}}</span>{{item[desc]}}<slot name="label"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'IepAppAssortCard',
  props: {
    dataList: {
      type: Array,
      required: false,
      default: () => [],
    },
    title: {
      type: String,
      default: 'assort',
    },
    desc: {
      type: String,
      default: 'desc',
    },
  },
  methods: {
    handleDetail (row) {
      this.$emit('click', row)
    },
  },
}
</script>
<style lang="scss" scoped>
.assort {
  .piece {
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    transition: 0.5s;
    &:nth-child(1) {
      margin-top: -7px;
    }
    &:hover {
      color: $--menu-color-primary;
    }
    .assort {
      color: #999;
    }
  }
}
</style>
