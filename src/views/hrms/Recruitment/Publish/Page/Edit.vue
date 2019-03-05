<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header title="发布招聘"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-collapse v-model="activeNames">
          <el-form-item label="岗位名称" class="">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" class="">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="目标人数" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="学历要求" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工作类型" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工作年限" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="专业要求" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="工作地点" class="form-half">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" class="form-half">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="岗位职责">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="岗位要示">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-collapse>
      </el-form>
      <!-- fixed footer toolbar -->
      <footer-tool-bar>
        <iep-button type="info" @click="handleGoBack">返回</iep-button>
        <iep-button type="primary">提交</iep-button>
      </footer-tool-bar>
    </basic-container>
  </div>
</template>
<script>
import PageHeader from '@/components/Page/Header'
import FooterToolBar from '@/components/FooterToolbar'
export default {
  components: { FooterToolBar, PageHeader },
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
