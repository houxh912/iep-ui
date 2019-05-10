<template>
  <div class="iep-page-form">
    <basic-container>
      <page-header :title="`${methodName}建议`">
        <el-button @click="back">返回建议列表</el-button>
      </page-header>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
        <iep-form-item class="form-half" label-name="建议主题" prop="theme">
          <el-input v-model="form.theme"></el-input>
        </iep-form-item>

        <iep-form-item class="form-half" prop="con" label-name=" 建议内容">
          <iep-input-area v-model="form.con"></iep-input-area>
        </iep-form-item>

        <el-row>
          <el-col :span="12">
            <iep-form-item label-name="通讯录" prop="academicId">
              <iep-dict-select v-model="form.academicId" dict-name=""></iep-dict-select>
            </iep-form-item>
          </el-col>
        </el-row>

        <iep-form-item class="form-half" prop="" label-name="附件">
          <el-input v-model="input2">
            <template slot="append">
              <el-upload class="upload-demo" action="" :on-change="handleChange" :file-list="fileList">
                <el-button size="small" type="primary">上传</el-button>
              </el-upload>
            </template>
          </el-input>
        </iep-form-item>
        <el-form-item label="">
          <el-tag class="el-tag-new" :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" type="white">
            {{tag}}
          </el-tag>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handlePublish">发送</iep-button>
            <iep-button @click="handleSubmit">保存</iep-button>
            <iep-button>取消</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getPublishRecruitmentById, postPublishRecruitment, putPublishRecruitment } from '@/api/hrms/publish_recruitment'
import { initForm, formToDto, rules } from './options'
import _ from 'lodash'
export default {
  data () {
    return {
      dynamicTags: ['内网2.0改造项目', '标数据基因新框架改造'],
      input2: '',
      back: () => {
        this.$router.push('/hrms_spa/suggestion_list')
      },
      rules,
      form: initForm(),
    }
  },
  computed: {
    methodName () {
      return this.id ? '编辑' : '新增'
    },
  },
  created () {
    if (this.id) {
      getPublishRecruitmentById(this.id).then(({ data }) => {
        this.form = this.$mergeByFirst(initForm(), data.data)
      })
    }
  },
  mounted () {
    if (this.$route.query.position) {
      const position = this.$route.query.position.map(m => +m) || []
      this.form.position = position || []
      setTimeout(() => {
        this.$refs['IepCascader'].handleChange(position)
      }, 2000)
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    onGoBack () {
      this.$router.history.go(-1)
    },
    handlePositionChange (item, options) {
      const value = item[item.length - 1]
      const position = _(options)
        .thru(function (coll) {
          return _.union(coll, _.map(coll, 'children'))
        })
        .flatten()
        .find({ value })
      if (position) {
        this.form.duties = position.duty
        this.form.claim = position.rqmt
      }
    },
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const submitFunction = this.id ? putPublishRecruitment : postPublishRecruitment
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const publish = isPublish === true ? true : false
          submitFunction(formToDto(this.form), publish).then(({ data }) => {
            if (data.data) {
              this.$message({
                message: `新建${this.methodName}成功`,
                type: 'success',
              })
              this.onGoBack()
            }
          })
        }
      })

    },
  },
}
</script>
<style lang="css" scoped>
.el-form-item >>> .el-form-item__content {
  display: flex;
  flex-direction: column;
}
.el-tag-new.el-tag--white {
  background: none;
  border: 0;
  color: #606266;
  transition: 0.1s;
}
.el-tag-new >>> .el-icon-close {
  color: #333;
}
.el-tag-new >>> .el-icon-close:hover {
  background-color: #fff;
  color: #cb3737;
}
</style>
