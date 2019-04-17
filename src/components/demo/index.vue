<template>
  <div class="iep-page-form">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="头像:">
        <iep-avatar v-model="form.avatar"></iep-avatar>
      </el-form-item>
      <el-form-item label="用户:">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <!-- <el-form-item label="用户O:">
        <iep-contact-one-select v-model="form.user"></iep-contact-one-select>
      </el-form-item> -->
      <el-form-item label="用户群:">
        <iep-contact-multiple-user v-model="form.userList"></iep-contact-multiple-user>
      </el-form-item>
      <!-- <el-form-item label="用户群O:">
        <iep-contact-one-multiple-user v-model="form.userList"></iep-contact-one-multiple-user>
      </el-form-item> -->
      <el-form-item label="群发:">
        <iep-contact-multiple v-model="form.receivers"></iep-contact-multiple>
      </el-form-item>
      <!-- <el-form-item label="群发O:">
        <iep-contact-one-multiple v-model="form.receivers"></iep-contact-one-multiple>
      </el-form-item> -->
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
      <el-form-item label="froala富文本:">
        <iep-froala-editor v-model="form.content"></iep-froala-editor>
      </el-form-item>
      <el-form-item label="froala展示:">
        <iep-html v-model="form.content"></iep-html>
      </el-form-item>
      <div class="fack-div"></div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        avatar: '',
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
        content: '',
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 20px;
  width: 100%;
  border: 1px solid #eee;
}
.fack-div {
  height: 500px;
  width: 500px;
}
</style>
