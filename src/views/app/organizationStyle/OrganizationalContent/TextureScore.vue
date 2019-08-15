<template>
  <div class="texture-score">
    <IepAppTabCard :title="title" :linkName="linkName">
      <el-button style="float: right; padding: 5px 0;" type="text" slot="right" @click="handleEvaluate">我要评价</el-button>
      <div class="texture-score-list">
        <div v-if="textureScoreList.length !== 0" class="texture-score-item">
          <div v-for="(item,index) in textureScoreList" :key="index" class="piece">
            <div class="img">
              <iep-img :src="item.avatar"></iep-img>
            </div>
            <div class="box">
              <div class="piece-title">
                <span class="name">{{item.creatorName}}<span class="department">{{item.department}}</span><span class="time">{{item.createTime}}</span></span>
              </div>
              <p class="feed">{{item.content}}</p>
            </div>
          </div>
        </div>
        <IepNoData v-else></IepNoData>
      </div>
    </IepAppTabCard>
    <!-- 评价 -->
    <iep-dialog :dialog-show="dialogShow" title="组织评价" width="600px" @close="close">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="0">
        <el-form-item label="" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="发表评价" :rows="5"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <iep-button type="primary" @click="submitForm">确认</iep-button>
        <iep-button @click="close">取消</iep-button>
      </template>
    </iep-dialog>
  </div>
</template>

<script>
import { getOrgevaluatePage, postOrgevaluateForm } from '@/api/admin/orgEvaluate'
const initFormData = () => {
  return {
    orgId: 0,
    content: '',
  }
}

export default {
  data () {
    return {
      title: '组织评价',
      linkName: '',
      textureScoreList: [],
      dialogShow: false,
      form: initFormData(),
      rules: {
        content: [
          { required: true, message: '请输入你的评价', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    getOrgevaluatePage () {
      getOrgevaluatePage({ size: 5, orgId: this.$route.params.id }).then(({ data }) => {
        this.textureScoreList = data.data.records
      })
    },
    // 我要评价
    handleEvaluate () {
      this.dialogShow = true
      this.form.orgId = this.$route.params.id
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          console.log('form: ', this.form)
          postOrgevaluateForm(this.form).then(({ data }) => {
            if (data.data) {
              this.$message.success('评价成功！')
              this.getOrgevaluatePage()
            } else {
              this.$message.error('评价出错，请重试')
            }
            this.dialogShow = false
          })
        }
      })
    },
    close () {
      this.form = initFormData()
      this.dialogShow = false
    },
  },
  created () {
    this.getOrgevaluatePage()
  },
}
</script>
<style lang="scss" scoped>
.texture-score-list {
  max-height: 261px;
  .texture-score-item {
    overflow: hidden;
  }
  .piece {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    overflow: hidden;
    .img {
      float: left;
      margin-right: 10px;
      width: 60px;
      height: 60px;
      border: 1px solid #ebeef5;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        transition: 0.5s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .box {
      flex: 3;
      .piece-title {
        .name {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          margin-right: 8px;
        }
        .department {
          flex: 2;
          margin-left: 10px;
        }
        .department,
        .time {
          font-size: 14px;
          color: #999;
        }
      }
      .feed {
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        &:hover {
          color: #ba1b21;
        }
      }
    }
  }
}
</style>
<style scoped>
.texture-score >>> .el-card__body {
  padding: 0;
  overflow-x: hidden;
}
.texture-score >>> .el-card__body::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  background-color: #fff;
}
.texture-score >>> .el-card__body::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
}
.texture-score >>> .el-card__body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  display: none;
  background-color: #ddd;
  -webkit-transition: 0.3s background-color;
  transition: 0.3s background-color;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.texture-score >>> .el-card:hover ::-webkit-scrollbar-thumb {
  display: block;
}

.texture-score >>> .el-card {
  padding: 0 20px;
  height: 330px;
}
</style>
