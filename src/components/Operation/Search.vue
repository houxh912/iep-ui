<template>
  <div class="input-wrapper">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" v-model="input">
      <el-button slot="append" size="small" @click="handleSearch">搜索</el-button>
    </el-input>
    <el-popover v-if="advanceSearch" placement="bottom-end" width="350" trigger="click">
      <slot></slot>
      <el-button slot="reference" size="small">高级搜索</el-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    placeHolder: {
      type: String,
      default: '关键字',
    },
    paramForm: {
      type: Object,
      default: () => { },
    },
    prop: {
      type: String,
      default: 'name',
    },
    advanceSearch: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      input: '',
    }
  },
  methods: {
    handleSearch () {
      this.$emit('search', this.paramForm[this.prop] = this.input)
    },
  },
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
  & > * {
    margin-right: 5px;
  }
}
</style>
