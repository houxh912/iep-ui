<template>
  <div class="iep-page-form culture-form">
    <basic-container>
      <iep-page-header title="新增平台" :backOption="backOption">
      </iep-page-header>
      <el-form :model="form" class="form-detail" size="small" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="平台图片：" required>
          <el-upload class="upload" drag action="" multiple>
            <i class="icon-xinzeng"></i>
            <div class="el-upload__text">上传图片</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="平台名称：" prop="platformName" required>
          <el-input type="text" v-model="form.platformName" placeholder="请输入平台名称"></el-input>
        </el-form-item>
        <el-form-item label="平台网址：" prop="web" required>
          <el-input type="text" v-model="form.web" placeholder="请输入平台网址"></el-input>
        </el-form-item>
        <el-form-item label="平台介绍：" prop="desc" required>
          <el-input type="textarea" v-model="form.desc" placeholder="请输入平台介绍"></el-input>
        </el-form-item>
      </el-form>
      <footer-tool-bar>
        <iep-button type="primary" @click="handleSubmit">保存</iep-button>
        <iep-button>重置</iep-button>
        <iep-button>取消</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import { initForm, rules } from './options'
import { getOrgBySelf, putOrg } from '@/api/goms/org'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      rules,
      form: initForm(),
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
    }
  },
  created () {
    this.loadPage()
  },
  computed: {
    ...mapState({
      orgId: state => state.user.userInfo.orgId,
    }),
  },
  methods: {
    handleSubmit () {
      putOrg(this.form).then(() => {
        this.$message({
          message: '新增平台成功',
          type: 'success',
        })
        this.$emit('onGoBack')
      })
    },
    loadPage () {
      getOrgBySelf(this.orgId).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.upload {
  width: 150px;
  height: 96px;
  overflow: hidden;
}
</style>

<style scoped>
.culture-form >>> .page-title {
  display: none;
}
.upload >>> .el-upload-dragger {
  padding-top: 15px;
  width: 100%;
  height: 100%;
}
.upload >>> .el-upload {
  width: 100%;
  height: 100%;
}
</style>
