<template>
  <iep-dialog :dialog-show="dialogShow" title="正文" width="80%" @close="close">
    <iep-html :value="form.text"></iep-html>
  </iep-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogShow: false,
      form: {
        text: '',
      },
    }
  },
  methods: {
    close () {
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>

