<template>
  <iep-dialog :dialog-show="dialogShow" title="发布说说" width="50%" @close="resetForm">
    <formTpl @load-page="resetForm"></formTpl>
  </iep-dialog>
</template>
<script>
import formTpl from '@/views/app/thoughtList/library/form'

function initFormData () {
  return {
    content: '',
    status: 0,
  }
}

const rules = {
  content: { required: true, message: '必填', trigger: 'change' },
}

export default {
  components: { formTpl },
  data () {
    return {
      rules,
      dialogShow: false,
      formData: initFormData(),
      loadState: false,
    }
  },
  methods: {
    open () {
      this.dialogShow = true
    },
    loadPage () {
      this.$emit('load-page')
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 40px;
  i {
    cursor: pointer;
    margin-left: 20px;
  }
}
</style>
