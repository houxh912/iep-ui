<template>
  <div class="form-dialog">
    <el-form ref="form" :model="formData">
      <div class="title">客户需求</div>
        <el-form-item prop="xuqiu">
          <el-input type="textarea" v-model="formData.xuqiu" rows=5 placeholder="此处填写领导指示"></el-input>
        </el-form-item>
        <div class="title">本周工作总结</div>
        <el-form-item prop="benzhouzongjie">
          <el-input type="textarea" v-model="formData.benzhouzongjie" rows=5 placeholder="此处填写本周工作总结"></el-input>
        </el-form-item>
        <div class="title">下周工作计划</div>
        <el-form-item prop="xiazhouzongjie">
          <el-input type="textarea" v-model="formData.xiazhouzongjie" rows=5 placeholder="此处填写下周工作计划"></el-input>
        </el-form-item>
        <div class="title">备注</div>
        <el-form-item prop="beizhu">
          <el-input type="textarea" v-model="formData.beizhu" rows=5 placeholder="此处填写总结与感悟"></el-input>
        </el-form-item>
        <el-form-item>
          <iep-button @click="submit" type="danger">保存</iep-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        zhishi: '',
        benzhouzongjie: '',
        xiazhouzongjie: '',
        beizhu: '',
      },
    }
  },
  methods: {
    submit () {
      this.$emit('putFormData', this.formData)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-dialog {
  .title {
    margin-bottom: 20px;
  }
  .detail {
    pre {
      padding-left: 20px;
      line-height: 20px;
      margin: 0;
      min-height: 50px;
    }
    .title {
      font-weight: 700;
      margin-top: 10px;
    }
  }
}
</style>
