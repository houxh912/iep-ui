<template>
  <iep-dialog :dialog-show="dialogShow" title="邀请信息" width="500px">
    <iep-input-area v-model="message"></iep-input-area>
    <template slot="footer">
      <iep-button type="primary" @click="handleOk()">批量邀请</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
      message: '',
    }
  },
  methods: {
    handleOk () {
      this.$emit('on-message', this.message)
    },
  },
}
</script>
