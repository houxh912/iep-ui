<template>
  <steps-content>
    <el-form class="content-wrapper" ref="form" size="small" :model="form" label-width="150px">
      <iep-form-item label-name="借款组织">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="支付方式">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="下线公司">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="收款账户">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="还款天数">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="还款时间">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="借款利息">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
      <iep-form-item label-name="借款金额">
        <el-input v-model="form.name"></el-input>
      </iep-form-item>
    </el-form>
    <template v-slot:action>
      <a-button type="primary" @click="handleSubmit">
        下一步
      </a-button>
    </template>
  </steps-content>

</template>
<script>
import StepsContent from './StepsContent'
export default {
  components: { StepsContent },
  data () {
    return {
      form: {},
    }
  },
  created () {
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.amount === 0) {
            return
          }
          this.$emit('on-data', values)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  width: 500px;
}
</style>
