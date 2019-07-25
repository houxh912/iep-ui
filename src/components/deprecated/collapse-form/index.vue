<template>
  <div>
    <el-form :inline="true" size="small">
      <slot name="search-header"></slot>
      <el-form-item>
        <el-button style="height: 32px;" class="search" type="info" icon="el-icon-search" @click="handleSearch" plain>搜索</el-button>
        <el-button style="margin-left:5px;height: 32px;" icon="el-icon-delete" @click="handleClear">清空</el-button>
        <el-button style="margin-left:5px;height: 32px;" v-if="showCollapse" type="default" :icon="collapseIcon" @click="showFormInline = !showFormInline">{{collapseName}}</el-button>
      </el-form-item>
      <br />
      <el-collapse-transition>
        <div v-show=" showFormInline">
          <slot name="search-body"></slot>
        </div>
      </el-collapse-transition>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CollapseForm',
  props: {
    showCollapse: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      showFormInline: false,
    }
  },
  computed: {
    collapseIcon () {
      return this.showFormInline ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    },
    collapseName () {
      return this.showFormInline ? '收起' : '展开'
    },
  },
  methods: {
    handleClear () {
      this.$emit('clear')
    },
    handleSearch () {
      this.$emit('search')
    },
  },
}
</script>
<style scoped>
.search {
  margin-left: -13px;
  border-radius: 0 3px 3px 0;
}
</style>
