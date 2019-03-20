<template>
  <div class="edit-wrapper">
    <el-card class="edit-card" shadow="hover">
      <div slot="header" class="title">
        <span>{{methodName}}公告</span>
      </div>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="主题：" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容：" required>
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="属性：" required>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="不允许评论" name="type" checked></el-checkbox>
            <el-checkbox label="置顶" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="发布范围：" required>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="当前组织" name="type" checked></el-checkbox>
            <el-checkbox label="联盟组织" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="">
          <iep-button type="primary" @click="handleSubmit">发布</iep-button>
          <iep-button>取消</iep-button>
        </el-form-item>
      </el-form>
    </el-card>
    <footer-tool-bar>
      <iep-button @click="handleGoBack">返回</iep-button>
    </footer-tool-bar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getTalentPoolById } from '@/api/hrms/talent_pool'
import FooterToolBar from '@/components/FooterToolbar'
import { initForm, workExpColumns, studyColumns, trainingColumns, certificateColumns } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  components: { FooterToolBar },
  data () {
    return {
      certificateColumns,
      trainingColumns,
      studyColumns,
      workExpColumns,
      activeNames: ['1'],
      methodName: '发布',
      form: initForm(),
      formRequestFn: () => { },
      checkList: [],
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getTalentPoolById(this.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    }
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
.object-con >>> .el-form-item__content {
  display: flex;
  justify-content: flex-start;
}
</style>

<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 10px;
}
.edit-wrapper {
  margin: 5px 5px 50px 5px;
  .el-form {
    margin-right: 20%;
    margin-top: 50px;
  }
  .form-half {
    width: 50%;
    display: inline-block;
  }
  .edit-card {
    .title {
      font-weight: 600;
      font-size: 16px;
    }
    .object {
      position: relative;
      margin: 0 15px 10px 0;
      height: 32px;
      font-size: 14px;
      i {
        position: relative;
        top: 0;
        right: 0;
        display: inline-block;
        margin-left: 5px;
        padding: 2px;
        font-size: 12px;
        text-align: center;
        background: none;
        border-radius: 50%;
        -webkit-transition: all 0.8s ease-out;
      }
    }
    .input-name {
      margin: 0 15px 10px 0;
      max-width: 260px;
    }
    .add {
      margin: 0 15px 10px 0;
      height: 32px;
      i {
        font-size: 20px;
        line-height: 12px;
      }
    }
  }
}
</style>
