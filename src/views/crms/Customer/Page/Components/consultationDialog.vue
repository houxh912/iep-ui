<template>
  <div class="consultation">
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="head">
        <p class="title">{{item.title}}</p>
        <p class="date">{{item.date}}</p>
      </div>
      <div class="content">
        <div class="msg">{{item.msg}}</div>
        <div class="code">
          <el-tag class="code-item" type="info" v-for="(code, index) in item.code" :key="index">{{code}}</el-tag>
        </div>
      </div>
    </div>
    <div class="add-consulta" @click="created"><i class="el-icon-plus"></i> 添加资讯</div>
    
    <iep-dialog :dialog-show="dialogShow" :title="`${methodName}资讯`" width="60%" @close="resetForm">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="标题：" prop="biaoti">
          <el-input v-model="formData.biaoti"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="neirong">
          <el-input type="textarea" v-model="formData.neirong"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
        <iep-button @click="resetForm">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>

<script>
import IepDialog from '@/components/IepDialog/'
// import { initConsultaForm } from '../options'
import { createConsultation } from '@/api/crms/custom'
export default {
  name: 'consultation',
  components: { IepDialog },
  data () {
    return {
      list: [],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      dicData: [
        { value: 1, label: '选项1' },
        { value: 2, label: '选项2' },
      ],
      submitFn: () => {},
    }
  },
  methods: {
    loadPage () {
      this.list = [
        {
          id: 1,
          title: '关于新项目的资讯',
          date: '2019-10-19',
          code: ['网站评测', '政务服务'],
          msg: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述',
        }, {
          id: 1,
          title: '关于新项目的资讯',
          date: '2019-10-19',
          code: ['网站评测', '政务服务'],
          msg: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述这是一段描述，这是一段描述这是一段描述这是一段描述',
        },
      ]
    },
    created () {
      this.dialogShow = true
      this.methodName = '新增'
      this.submitFn = createConsultation
    },
    resetForm () {
      // this.formData = initConsultaForm()
      this.dialogShow = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
            this.dialogShow = false
          })
        } else {
          return false
        }
      })
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.consultation {
  .item {
    margin-bottom: 10px;
    .head {
      display: flex;
      .title {
        flex: 1;
        font-weight: 700;
      }
      .date {
        width: 80px;
      }
    }
    .content {
      background-color: #f3f3f3;
      padding: 20px;
      .code {
        text-align: right;
        .code-item {
          margin-left: 15px;
        }
      }
    }
  }
  .add-consulta {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
}
</style>
