<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" size="small" label-width="80px">
      <el-form-item label="用户:">
        <iep-contact-select v-model="form.user"></iep-contact-select>
      </el-form-item>
      <el-form-item label="用户群:">
        <iep-contact-multiple v-model="form.user"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="文件:">
        <iep-upload v-model="form.fileList"></iep-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import IepContactSelect from '@/components/IepContact/Select'
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepUpload from '@/components/IepCommon/Upload'
export default {
  components: { IepContactSelect, IepContactMultiple, IepUpload },
  data () {
    return {
      form: {
        user: {
          id: 1,
          name: '哈哈',
        },
        userList: [],
        fileList: [],
      },
    }
  },
  methods: {
    fillUser (user) {
      this.form.userId = user.id
      this.form.userName = user.name
    },
    fillUserList (userList) {
      this.form.userList = userList
    },
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
