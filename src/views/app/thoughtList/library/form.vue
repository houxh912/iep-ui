<template>
  <div class="head">
    <el-form :model="formData" :rules="rules" ref="form" label-width="0px" class="input">
      <el-form-item prop="content">
        <el-input id="keyupStart" type="textarea" rows="5" placeholder="工作之余，分享下今天的感受吧~" v-model="formData.content" class="textarea" maxlength="1000" @keyup.native="handleKeyup"></el-input>
      </el-form-item>
      <div class="img-list" v-if="formData.images.length > 0">
        <div v-for="(item, index) in formData.images" :key="index" class="avatar">
          <div class="close" @click="handleDeleteImage(index)"><i class="el-icon-close"></i></div>
          <iep-img :src="item"></iep-img>
        </div>
        <el-upload
          v-if="formData.images.length < 3"
          class="avatar-uploader"
          action="/api/admin/file/upload/avatar"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          accept="image/*"
          ref="upload">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="button-list">
        <div class="func" @click="handleImage" v-if="formData.images.length === 0 && transmitId === -1">
          <el-upload
            action="/api/admin/file/upload/avatar"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleAvatarSuccess"
            accept="image/*"
            ref="upload">
            <div class="func"><i class="icon-tupian"></i><p>图片</p></div>
          </el-upload>
        </div>
        <div class="func" v-if="formData.images.length > 0 && transmitId === -1">
          <i class="icon-tupian"></i><p>图片</p>
        </div>
        <div class="func">
          <i class="symbol">@</i><p>提醒</p>
        </div>
        <div class="func">
          <i class="symbol">#</i><p>话题</p>
        </div>
        <div class="switch">
          <p>是否开放：</p>
          <el-switch
            class="el-switch"
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#bbb"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </div>
        <iep-button type="primary" class="submit" @click="handleSubmit('form')" :loading="loadState">保存</iep-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { thoughtsCreate } from '@/api/cpms/thoughts'
import { addBellBalanceRuleByNumber } from '@/api/fams/balance_rule'
import store from '@/store'
import { getSubject, getName } from './util'

const initForm = () => {
  return {
    content: '',
    status: 0,
    images: [],
  }
}

const rules = {
  content: { required: true, message: '必填', trigger: 'change' },
}

export default {
  props: {
    transmitId: {
      type: Number,
      default: -1,
    },
  },
  data () {
    return {
      formData: initForm(),
      rules,
      limit: 3,
      loadState: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  methods: {
    handleKeyup (val) {
      console.log('val: ', val)
      if (val.key === '@') {
        console.log('@')
        var elInput = document.getElementById('keyupStart') //根据id选择器选中对象
        var startPos = elInput.selectionStart // input 第0个字符到选中的字符
        console.log('startPos: ', startPos)
      } else if (val.key === ' ') {
        console.log('空格')
      }
    },
    handleAvatarSuccess (row) {
      this.formData.images.push(row.data.url)
    },
    // 上传图片
    handleImage () {
      this.$refs['upload'].submit()
    },
    resetForm () {
      this.formData = initForm()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    handleDeleteImage (index) {
      this.formData.images.splice(index, 1)
    },
    handleSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loadState = true
          // 判断是否是转发
          if (this.transmitId > -1) {
            this.formData.transmitId = this.transmitId
          }
          // 判断说说中是否存在话题
          let subjectObj = getSubject(this.formData.content)
          if (subjectObj.type) {
            this.formData.topics = [subjectObj.data]
          }
          // 判断说说中是否存在人名
          let nameObj = getName(this.formData.content)
          if (nameObj.type) {
            this.formData.nameList = nameObj.list.map(m => m.name)
          }
          thoughtsCreate(this.formData).then(({ data }) => {
            if (data.data) {
              this.resetForm()
              // 判断是否公开，不公开(1)的说说没有奖励
              if (this.formData.status === 1) {
                this.loadState = false
                this.$emit('load-page')
              } else {
                addBellBalanceRuleByNumber('SHUOSHUO').then(({data}) => {
                  this.$message.success(`恭喜您发表了一篇说说，${data.msg}，继续努力`)
                  this.loadState = false
                  this.$emit('load-page')
                })
              }
            } else {
              this.loadState = false
              this.$message.error(data.msg)
            }
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  .input {
    width: 100%;
    margin: auto;
    .img-list {
      display: flex;
      .avatar-uploader {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
        position: relative;
        margin-right: 20px;
        .close {
          position: absolute;
          right: -10px;
          top: -10px;
          width: 20px;
          height: 20px;
          font-size: 20px !important;
          background-color: #ddd;
          color: #fff;
          border-radius: 50%;
          line-height: 18px;
          cursor: pointer;
          &:hover {
            color: #fff;
            background-color: #e27474;
          }
        }
      }
    }
    .textarea {
      margin-bottom: 15px;
    }
    .button-list {
      position: relative;
      display: flex;
      padding: 0 0 10px;
      .func {
        display: flex;
        cursor: pointer;
        .symbol {
          font-size: 16px;
        }
        p {
          margin: 0 35px 0 5px;
        }
      }
      .switch {
        display: flex;
        padding-top: 4px;
        p {
          line-height: 18px;
          margin: 0;
        }
      }
      .submit {
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
