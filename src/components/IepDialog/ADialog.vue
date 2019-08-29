<template>
  <a-modal :title="title" :visible="dialogShow" v-bind="$attrs" v-on="$listeners">
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
    <div v-if="dialogShow">
      <slot></slot>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'IepADialog',
  inheritAttrs: false,
  props: {
    dialogShow: {
      default: false,
      type: Boolean,
    },
    title: {
      default: '标题',
      type: String,
      required: true,
    },
  },
}
</script>
