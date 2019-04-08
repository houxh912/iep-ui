<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="用户:">
        <iep-contact-multiple-user v-model="form.user"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="用户群:">
        <iep-contact-multiple-user v-model="form.userList"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="群发:">
        <iep-contact-multiple v-model="form.receivers"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="单部门:">
        <iep-dept-select v-model="form.dept"></iep-dept-select>
      </el-form-item>
      <el-form-item label="多部门:">
        <iep-dept-multiple v-model="form.deptList"></iep-dept-multiple>
      </el-form-item>
      <el-form-item label="文件:">
        <iep-upload v-model="form.fileList" drag>
          点击进入<a href="http://77777">haahahahah</a>你好
        </iep-upload>
      </el-form-item>
      <el-form-item label="标签:">
        <iep-tag v-model="form.tagList"></iep-tag>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        user: {
          id: 1,
          name: '哈哈',
        },
        receivers: { // 比如接收人
          unions: [],
          orgs: [],
          users: [],
        },
        userList: [],
        dept: {
          id: 1,
          name: '研发部',
        },
        deptList: [{
          id: 1,
          name: '研发部',
        }],
        fileList: [{ 'name': 'AINY4Y0AL3.txt', 'url': 'files-04cd8be68d2846c197432e51ee8888b5.txt' }],
        tagList: ['大数据', '人工智能'],
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  margin: 10px 20px;
  width: 600px;
  border: 1px solid #eee;
}
</style>
