<template>
  <div>
    <el-form :inline="true" size="small">
      <slot name="search-header"></slot>
      <el-form-item>
        <iep-button style="height: 32px;" class="search" type="info" @click="handleSearch" plain>搜索</iep-button>
        <iep-button style="margin-left:5px;height: 32px;" @click="handleClear">清空</iep-button>
        <iep-button style="margin-left:5px;height: 32px;" v-if="showCollapse" type="default" :icon="collapseIcon" @click="showFormInline = !showFormInline">{{collapseName}}</iep-button>
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
  color: #909399;
  background: #f4f4f5;
  border-color: #d3d4d6;
}
.search:hover {
  background: #909399;
  border-color: #909399;
  color: #fff;
}
</style>
