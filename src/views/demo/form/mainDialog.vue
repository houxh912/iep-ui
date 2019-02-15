<template>
  <div class="main-form">
    <gov-dialog
      ref="dialog"
      :title="status[state]"
      @closed="handleClosed"
      @handleSubmit="handleSubmit"
      :is-btn-group="state!='detail'">
      <gov-layout-form>
        <template v-if="state==='detail'">
          <div class="detail-wrapper">
            <!-- <avue-form-detail v-model="formData" :option="detailFormOption"></avue-form-detail> -->
            <gov-form-detail v-model="formData" :option="detailFormOption"></gov-form-detail>
          </div>
        </template>
        <template v-else>
          <avue-form ref="form" v-model="formData" :option="formOption"></avue-form>
        </template>
      </gov-layout-form>
    </gov-dialog>
  </div>
  
</template>

<script>

import { formOption } from './const/index'

export default {
  data () {
    return {
      formData: {},
      matState: 'create',
      status: {update: '编辑', create: '新增', detail: '详情'},
    }
  },
  computed: {
    formOption () {
      return formOption
    },
    detailFormOption () {
      return formOption
    },
  },
  props: {
    state: {
      type: String,
      default: 'create',
    },
  },
  methods: {
    open (data) {
      this.$refs['dialog'].open()
      this.formData = data
    },
    close () {
      this.$refs['dialog'].close()
    },
    handleClosed () {
      if (this.state != 'detail') {
        this.$refs.form.clearValidate()
        this.$refs.form.resetForm()
      }
    },
    handleSubmit () {
      this.$refs['form'].validate().then(()=>{
        
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>

