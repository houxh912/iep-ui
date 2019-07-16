<template>
  <div class="head">
    <div class="title">早晚五分钟，为<span class="akey">智慧</span>加油</div>
    <div class="input">
      <el-input type="textarea" rows="5" placeholder="工作之余，分享下今天的感受吧~" v-model="formData.content" class="textarea"></el-input>
      <div class="img-list" v-show="formData.image.length > 0">
        <iep-img v-for="(item, index) in formData.image" :key="index" :src="item" class="avatar"></iep-img>
        <el-upload
          v-show="formData.image.length < 3"
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
        <div class="func" @click="handleImage">
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
        <iep-button type="primary" class="submit">保存</iep-button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

const initForm = () => {
  return {
    content: '',
    status: 0,
    image: [],
  }
}

export default {
  data () {
    return {
      formData: initForm(),
      limit: 3,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
    }
  },
  methods: {
    handleAvatarSuccess (row) {
      this.formData.image.push(row.data.url)
    },
    // 上传图片
    handleImage () {
      this.$refs['upload'].submit()
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  padding: 30px 0 5px;
  .title {
    font-size: 24px;
    margin-bottom: 20px;
    .akey {
      color: #c74c50;
    }
  }
  .input {
    width: 1200px;
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
      }
    }
    .textarea {
      margin-bottom: 15px;
    }
    .button-list {
      position: relative;
      display: flex;
      padding: 10px 0;
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
