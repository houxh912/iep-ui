<template>
  <div class="new">
    <page-header title="新增邮件"></page-header>
    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" class="form">
      <el-form-item label="收件人：" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="主题：" prop="zhuti">
        <el-input v-model="formData.zhuti"></el-input>
      </el-form-item>
      <el-form-item>
        <iep-button>添加附件</iep-button>
        <iep-button @click="addRelation">添加关联</iep-button>
      </el-form-item>
      <el-form-item class="material">
        <ul class="list">
          <li class="li" v-for="(item, index) in formData.materialList" :key="index">
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
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <iep-editor v-model="formData.zhengwen"></iep-editor>
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
import IepEditor from '@/components/IepEditor/'
import MainDialog from './mainDialog'

export default {
  components: { PageHeader, IepEditor, MainDialog },
  data () {
    return {
      formData: {
        materialList: [
          { id: 1, name: '资源平台0221.rp（3.50M）' },
          { id: 2, name: '资源平台页面清单.xlsx（10.2K）' },
          { id: 3, name: 'DIPS产品工作进度说明（17.4K）' },
        ],
      },
      rules: {},
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
      // this.formData = initFormData()
    },
    submitForm (formName) {
      console.log('formName: ', formName)
    },
    submitDraft (formName) {
      console.log('formName: ', formName)
    },
    addRelation () {
      this.$refs['relation'].dialogShow = true
      this.$refs['relation'].loadData()
    },
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
        border: 1px solid #ddd;
        padding: 5px 10px;
        .li {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .relation {
      .item {
        border: 1px solid #ddd;
        .list {
          padding: 5px 0 0;
          .li {
            height: 30px;
            line-height: 30px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
