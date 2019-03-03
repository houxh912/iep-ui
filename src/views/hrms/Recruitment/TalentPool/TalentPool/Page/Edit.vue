<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>新增简历</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <i class="header-icon el-icon-info"></i> 基础信息
            </template>
            <el-form-item label="姓名" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" class="form-half">
              <el-radio-group v-model="form.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像" class="">
              <el-input v-model="form.avatar"></el-input>
            </el-form-item>
            <el-form-item label="出生年月" class="form-half">
              <el-input v-model="form.birthday"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="求职意向" name="2">
            <el-form-item label="应聘岗位" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="到岗时间" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="应聘岗位" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="到岗时间" class="form-half">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="学习工作经理" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="培训工作情况" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
          <el-collapse-item title="附件上传" name="5">
            <iep-editor></iep-editor>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-card>
    <!-- fixed footer toolbar -->
    <footer-tool-bar :style="{ width: `calc(100% - 288px)`}">
      <iep-button type="info" @click="handleGoBack">返回</iep-button>
      <iep-button type="primary">提交</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import FooterToolBar from '@/components/FooterToolbar'
import IepEditor from '@/components/IepEditor/'
export default {
  components: { FooterToolBar, IepEditor },
  data () {
    return {
      activeNames: ['1', '2', '3', '4', '5'],
      form: {
        name: '',
        sex: '',
      },
    }
  },
  methods: {
    handleGoBack () {
      this.$emit('onGoBack')
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-collapse-item__wrap {
  padding: 30px 70px 0 70px;
  border: none;
}
.edit-wrapper >>> .el-collapse {
  border: none;
}
.edit-wrapper >>> .el-collapse-item__header {
  background-color: #f8f8f8;
  font-size: 15px;
  font-weight: 700;
  padding-left: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
}
</style>

<style lang="scss" scoped>
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
    }
  }
}
</style>
