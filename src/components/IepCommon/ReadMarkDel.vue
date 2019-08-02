<template>
  <a-button-group>
    <a-tooltip v-if="enableList[0]">
      <template slot="title">
        <span>已读</span>
      </template>
      <a-button :type="typeList[0] ? 'primary' : 'default'" icon="eye" @click="handleViewBatch"></a-button>
    </a-tooltip>
    <a-tooltip v-if="enableList[1]">
      <template slot="title">
        <span>设置 / 取消标记</span>
      </template>
      <a-button :type="typeList[1] ? 'primary' : 'default'" icon="flag" @click="handleMarkBatch"></a-button>
    </a-tooltip>
    <a-tooltip v-if="enableList[2]">
      <template slot="title">
        <span>删除</span>
      </template>
      <a-button :type="typeList[2] ? 'primary' : 'default'" icon="delete" @click="handleDelBatch"></a-button>
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
    typeList: {
      type: Array,
      default: () => [false, false, false],
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

