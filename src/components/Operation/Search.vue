<template>
  <div class="input-wrapper" :class="{'advance-search': advanceSearch}">
    <el-input :placeholder="placeholder" prefix-icon="el-icon-search" size="small" @keyup.enter.native="handleSearch" v-model="input" :maxlength="120" clearable>
      <iep-button class="search-btn" slot="append" @click="handleSearch">搜索</iep-button>
    </el-input>
    <el-popover v-if="advanceSearch" placement="bottom-end" width="350" trigger="click">
      <slot></slot>
      <iep-button class="senior-btn el-icon-arrow-down" slot="reference"></iep-button>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'OperationSearch',
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字进行搜索',
    },
    prop: {
      type: String,
      default: 'name',
    },
    advanceSearch: {
      type: Boolean,
      default: false,
    },
    params: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      input: '',
      form: {},
    }
  },
  methods: {
    handleSearch () {
      this.form[this.prop] = this.input
      this.$emit('search-page', this.form)
    },
  },
  mounted () {
    this.input = this.params
  },
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  max-width: 350px;
  margin: 0 auto;
}
.input-wrapper > * {
  margin-right: 5px;
}
.input-wrapper ::v-deep .el-input.is-active .el-input__inner {
  border-color: #c0c4cc;
}
.advance-search ::v-deep .el-input-group__append {
  border-radius: 0;
}
.input-wrapper ::v-deep .el-input__inner:focus {
  border-color: #c0c4cc;
}
.input-wrapper ::v-deep .senior-btn {
  margin-left: -6px;
  padding: 8px 5px;
  border-radius: 0 3px 3px 0;
}
.input-wrapper ::v-deep .el-input-group {
  width: inherit;
}
.search-btn {
  &:focus,
  &:hover {
    opacity: 0.8;
  }
}
</style>
