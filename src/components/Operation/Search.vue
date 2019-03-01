<template>
  <div class="input-wrapper">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="small" v-model="input">
      <el-button class="search-btn" slot="append" size="small" @click="handleSearch">搜索</el-button>
    </el-input>
    <el-popover v-if="advanceSearch" placement="bottom-end" width="350" trigger="click">
      <slot></slot>
      <el-button class="senior-btn el-icon-arrow-down" slot="reference" size="small"></el-button>
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
      form: {},
    }
  },
  methods: {
    handleSearch () {
      this.$emit('search', this.form[this.prop] = this.input)
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
  .senior-btn {
    margin-left: -6px;
    padding: 9px 5px;
    border-radius: 0 3px 3px 0;
    &:hover,
    &:focus {
      border-color: #bf051a;
      background-color: #fff2f4;
      color: #bf051a; 
    }
  }
}
.search-btn {
  &:hover,
  &:focus {
   opacity: .8;
  }
}

</style>
