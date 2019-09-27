<template>
  <iep-dialog :dialog-show="dialogShow" title="选择" width="500px" @close="dialogShow = false">
    <iep-button>我是新用户</iep-button>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
    }
  },
}
</script>
