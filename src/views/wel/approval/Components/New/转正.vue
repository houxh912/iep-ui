<template>
  <el-form ref="form" :model="form" label-width="120px" size="small">
    <el-form-item label="主题：">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="内容：">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item label="属性：">
      <el-checkbox-group v-model="form.prop">
        <el-checkbox label="不允许评论" name="type" checked></el-checkbox>
        <el-checkbox label="置顶" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="发布范围：">
      <el-checkbox-group v-model="form.area">
        <el-checkbox label="当前组织" name="type" checked></el-checkbox>
        <el-checkbox label="联盟组织" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="">
      <operation-wrapper>
        <iep-button type="primary" @click="handleSubmit">提交</iep-button>
        <iep-button @click="handlePublish">保存并发布</iep-button>
      </operation-wrapper>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      form: {},
    }
  },
  methods: {
    handlePublish () {
    },
    handleSubmit () {
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>
