<template>
  <a-modal :visible="dialogShow" :title="title" v-bind="$attrs" v-on="$listeners">
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
    <slot></slot>
  </a-modal>
</template>
<script>
export default {
  name: 'IepADialog',
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
