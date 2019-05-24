<template>
  <a-button-group>
    <a-tooltip placement="top">
      <template slot="title">
        <span>已读</span>
      </template>
      <a-button v-if="enableList[0]" icon="eye" @click="handleViewBatch"></a-button>
    </a-tooltip>
    <a-tooltip placement="top">
      <template slot="title">
        <span>标记</span>
      </template>
      <a-button v-if="enableList[1]" icon="flag" @click="handleMarkBatch"></a-button>
    </a-tooltip>
    <a-tooltip placement="top">
      <template slot="title">
        <span>删除</span>
      </template>
      <a-button v-if="enableList[2]" icon="delete" @click="handleDelBatch"></a-button>
    </a-tooltip>
  </a-button-group>
</template>
<script>
export default {
  name: 'IepReadMarkDel',
  props: {
    enableList: {
      type: Array,
      default: () => [true, true, true],
    },
  },
  methods: {
    handleViewBatch () {
      this.$emit('on-view-batch')
    },
    handleMarkBatch () {
      this.$emit('on-mark-batch')
    },
    handleDelBatch () {
      this.$emit('on-del-batch')
    },
  },
}
</script>

