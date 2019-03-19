<template>
  <div class="new">
    <page-header title="新增邮件"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="form">
      <el-form-item label="收件人：" prop="name">
        <!-- <el-input v-model="formData.name"></el-input> -->
        <iep-tag v-model="formData.receiverIds"></iep-tag>
      </el-form-item>
      <el-form-item label="主题：" prop="subject">
        <el-input v-model="formData.subject"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button>添加附件</iep-button>
        <iep-button @click="addRelation">添加关联</iep-button>
      </el-form-item>
      <el-form-item class="material">
        <ul class="list">
          <li class="li" v-for="(item, index) in formData.materialIds" :key="index">
            <i class="icon-fujian"></i> {{item.name}}
            <iep-button type='text'>删除</iep-button>
          </li>
        </ul>
      </el-form-item>
      <el-form-item class="relation">
        <div class="item">
          <el-form-item label="关联任务：" label-width="90px">
            <ul class="list">
              <li class="li">显示关联任务1号</li>
              <li class="li">显示关联任务2号</li>
            </ul>
          </el-form-item>
          <el-form-item label="关联报表：" label-width="90px">
            <ul class="list">
              <li class="li">显示关联报表1号</li>
              <li class="li">显示关联报表2号</li>
            </ul>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="邮件标签：">
        <iep-tag v-model="formData.tagKeyWords" plus @selectTags="selectTags"></iep-tag>
      </el-form-item>
      <el-form-item label="正文">
        <!-- <iep-editor v-model="formData.zhengwen"></iep-editor> -->
        <el-input type="textarea" rows=5 v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button type="danger" @click="submitForm('form')">发送</iep-button>
        <iep-button @click="submitDraft('form')">保存为草稿</iep-button>
        <iep-button @click="resetForm('form')">取消</iep-button>
      </el-form-item>
    </el-form>
    <main-dialog ref="relation"></main-dialog>
  </div>
</template>

<script>
import PageHeader from '@/components/Page/Header'
// import IepEditor from '@/components/IepEditor/'
import MainDialog from './mainDialog'
import IepTag from '@/components/IepTags/input'
import { createEmail } from '@/api/mlms/email/index'

const initFormData = {
  attachmentIds: [],
  content: '',
  emailId: 0,
  materialIds: [],
  projectIds: [],
  receiverIds: [],
  reportIds: [],
  status: 1,
  subject: '',
  summaryIds: [],
  tagKeyWords: [],
  type: 0,
}

export default {
  components: { PageHeader, MainDialog, IepTag },
  data () {
    return {
      formData: initFormData,
      rules: {},
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.formData = initFormData
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createEmail(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: '新增邮件成功',
              type: 'success',
              duration: 2000,
            })
            this.formData = initFormData
          })
        } else {
          return false
        }
      })
    },
    submitDraft () {
      this.formData.status = 0
      createEmail(this.formData).then(() => {
        this.$notify({
          title: '成功',
          message: '保存草稿成功',
          type: 'success',
          duration: 2000,
        })
        this.formData = initFormData
      })
    },
    addRelation () {
      this.$refs['relation'].dialogShow = true
      this.$refs['relation'].loadData()
    },
    // 选择标签
    selectTags () {},
  },
}
</script>

<style lang="scss" scoped>
.new {
  padding: 20px;
  background-color: #fff;
  .form {
    width: 80%;
    .material {
      .list {
        margin: 0;
        border: 1px dashed #ddd;
        padding: 5px 10px;
        .li {
          height: 30px;
          line-height: 30px;
          list-style: none;
        }
      }
    }
    .relation {
      .item {
        border: 1px dashed #ddd;
        border-radius: 5px;
        .list {
          margin: 0;
          padding: 5px 0 0;
          .li {
            height: 30px;
            line-height: 30px;
            color: #999;
            list-style: none;
          }
        }
      }
    }
  }
}
</style>
