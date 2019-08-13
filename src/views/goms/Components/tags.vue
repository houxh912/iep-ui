<template>
  <div class="tags-con">
    <span>{{title}}：</span>
    <span v-if="!tags.length">暂无</span>
    <span class="tags" @click="handleOpen(tag)" v-for="(tag, i) in tags" :key="i">
      {{tag}}
    </span>
  </div>
</template>
<script>
export default {
  name: 'IepGomsTags',
  props: {
    title: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    iepType: {
      type: String,
      default: 'tag',
    },
  },
  methods: {
    handleOpen (name) {
      switch (this.iepType) {
        case 'tag':
          this.$openTagDetail(name)
          break
        default:
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tags-con {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.tags {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  padding: 0 10px;
  cursor: pointer;
  &:hover {
    color: $--color-primary;
  }
  &:nth-child(1) {
    padding-left: 0;
  }
  &::before {
    position: absolute;
    content: "";
    top: 10px;
    right: -7px;
    width: 15px;
    height: 1px;
    background-color: #666;
    transform: rotate(125deg);
    -o-transform: rotate(125deg);
    -moz-transform: rotate(125deg);
    -webkit-transform: rotate(125deg);
  }
  &:last-child::before {
    display: none;
  }
}
</style>
