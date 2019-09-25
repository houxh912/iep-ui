<template>
  <div class="title">
    <template v-if="type === 'edit'">
      <h3 class="name">图片多选题</h3>
      <div class="ti">
        <div class="ti1">标题：</div>
        <div class="ti2">
          <el-input style="width:80%" v-model="data.title" :maxlength="200"></el-input>
        </div>
      </div>
      <div class="ti">
        <div class="ti1">选项：</div>
        <div class="ti2">
          <div class="imgs">
            <div class="img" v-for="(file,index) in data.optionList" :key="index">
              <img :src="file.url" />
              <el-input style="width:130px;border:none;text-align:center" size="mini" placeholder="图片说明" v-model="file.description" :maxlength="200"></el-input>
              <i class="delete el-icon-delete" @click="handleDelete(index)"></i>
            </div>
            <div class="img">
              <el-upload class="upload-demo" action="/api/question/dna_file/upload" :on-preview="handlePreview" :on-remove="handleRemove" :headers="myHeaders" :file-list="data.optionList" :on-success="handleSuccess" :on-error="handleError" :on-change="handleChange" :before-upload="beforeImgUpload" :show-file-list="false" list-type="picture-card">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>

      <div class="mh100">
        <div>
          <el-button class="gray" type="text">
            <i class="blue el-icon-refresh"></i>选择范围 最少
            <el-input style="width:100px;border:none" size="mini" placeholder="请输入选项" v-model="data.minNum" type="number" min="0" />
            最多
            <el-input style="width:100px;border:none" size="mini" placeholder="请输入选项" v-model="data.maxNum" type="number" min="0" />
          </el-button>
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="(disabled||data.isShow == '1') ? true : false">
        <h3 :id="'a'+data.orderNumber" :name="'a'+data.orderNumber" style="margin:8px 0">{{(data.orderNumber||index)+". "}}{{data.title}}<span style="color:#DC143C;vertical-align:-2px;" v-if="data.isRequire === '1'">*</span></h3>
        <div style="min-height:230px">
          <el-checkbox-group v-model="data.answer.value" :max="data.maxNum" :disabled="disabled">
            <div v-for="(item,index) in data.optionList" :key="index" class="imgDiv">
              <el-checkbox :label="item.name">
                <p>{{item.description}}</p>
                <img :src="item.url" />
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
    </template>
  </div>
</template>


<script>
import store from '@/store'
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => { },
    },
    type: {
      type: String,
      default: () => 'edit',
    },
    index: {
      type: Number,
      default: () => 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      myHeaders: { Authorization: 'Bearer ' + store.getters.access_token },
    }
  },
  created () {
    // this.data.optionList ? "" : this.data.optionList = []
  },
  watch: {
    'data.minNum': {
      deep: true,
      handler (val) {
        if (val > this.data.maxNum) {
          this.$set(this.data, 'minNum', this.data.maxNum)
        }
        if (val < 0) {
          this.$set(this.data, 'minNum', 0)
        }
      },
    },
    'data.maxNum': {
      deep: true,
      handler (val) {
        if (val > (this.data.optionList.length || 0)) {
          this.$set(this.data, 'maxNum', this.data.optionList.length || 0)
        }
        if (val < this.data.minNum) {
          this.$set(this.data, 'maxNum', this.data.minNum)
        }
      },
    },
    'data.answer.value': {
      deep: true,
      handler (val) {
        // console.log("哈哈哈",val)
        if (!this.disabled && val && this.data.logic != '{}') {
          let logic = JSON.parse(this.data.logic)
          console.log(logic)
          if (logic.type === 'jump') {
            for (let item of logic.logic) {
              if (val.indexOf(item.source) > -1) {
                window.location.hash = '#a' + item.target
              }
            }
          }
          if (logic.type === 'display') {
            let targetShow = []
            let targetHidden = []
            let allTaget = []
            logic.logic.map(item => {
              allTaget.push(...item.target)
            })
            for (let item of logic.logic) {
              if (val.indexOf(item.source) > -1) {
                targetShow.push(...item.target)
              }
            }
            targetHidden = allTaget.filter(item => !(targetShow.indexOf(item) > -1))
            this.$emit('changeDisplay', targetShow, '1')
            this.$emit('changeDisplay', targetHidden, '2')
          }
        }
      },
    },
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      console.log('改变了', file, fileList)
      // let newFileList = []
      // fileList.map((item)=>{
      //   newFileList.push({
      //     description: item.description,
      //     url: item.url,
      //     name: item.name,
      //     type: 2,
      //   })
      // })
      // console.log("newFileList",newFileList)
      // this.$set(this.data,"optionList",newFileList)
    },
    handleSuccess (response) {
      let data = response.data
      let newfile = {
        description: data.description,
        url: data.url,
        name: data.fileName,
        type: 2,
      }
      this.data.optionList.push(newfile)
      this.$set(this.data, 'minNum', 0)
      this.$set(this.data, 'maxNum', this.data.optionList.length)
    },
    handleError () {
      this.$message.info('上传失败！')
    },
    handleDelete (index) {
      let fileList = [...this.data.optionList]
      fileList.splice(index, 1)
      this.$set(this.data, 'optionList', fileList)
    },
    beforeImgUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG && !isPNG) {
        this.$message.error('上传图片只能是 JPG,PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return (isJPG || isPNG) && isLt10M
    },
  },
}
</script>
<style lang="scss" scoped>
.title {
  margin: 5px;
  // color: #909399;
  .name {
    margin: 13px 0;
    font-size: 16px;
  }
  .ti {
    display: flex;
    .ti1 {
      font-size: 14px;
      padding: 8px;
    }
    .ti2 {
      flex: 1;
    }
  }
  span {
    margin: 0px 10px 0 0;
  }
}
.mg10 {
  margin: 10px 0;
}
.textIn {
  border: none;
  width: 100px;
}
.curP {
  cursor: pointer;
}
.imgs {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.imgs .img {
  width: 150px;
  height: 200px;
  padding-top: 15px;
}
.imgs .img img {
  height: 150px;
  width: 150px;
  border: 1px solid;
}
.delete {
  vertical-align: -2px;
  margin-left: 3px;
  cursor: pointer;
}
.mh100 {
  min-height: 100px;
  line-height: 57px;
}
.imgDiv {
  width: 150px;
  height: 200px;
  float: left;
  margin-right: 15px;
  position: relative;
  p {
    position: absolute;
    top: 157px;
    width: 150px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img {
    width: 150px;
    height: 150px;
    border: 1px solid;
    position: absolute;
    left: 0;
    top: 0;
  }
  .se {
    width: 150px;
    text-align: center;
  }
  > .el-radio__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
  > .el-checkbox__label {
    padding-left: 0;
  }
  > .el-checkbox__input {
    position: absolute;
    top: 184px;
    left: 67px;
  }
}
.gray {
  color: #606266;
  font-size: 15px;
}
.blue {
  color: #3a8ee6;
  padding-right: 5px;
}
</style>
