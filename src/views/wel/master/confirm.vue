<template>
  <div class="personal-top">
    <el-card class="box-card" shadow="hover">
      <div class="img-con">
        <div class="img">
          <iep-img :src="userInfo.avatar" alt=""></iep-img>
        </div>
        <span class="num">{{userInfo.staffId}}</span>
      </div>
      <div class="text">
        <div class="name-con">
          <span class="name">{{userInfo.name}}</span>
          <span class="post">{{userInfo.positionName}}
            <iep-identity-mark class="mark" :icon="item.icon" :title="item.label" v-for="(item, index) in userInfo.identityMarks" :key="index"></iep-identity-mark>
          </span>
        </div>
        <span class="autograph">个性签名：{{userInfo.signature}}</span>
        <div class="classTags">
          <div class="classTag">
            <div class="label">卓越标签：</div>
            <div class="span">
              <el-tag type="white" v-for="(item, index) in userInfo.abilityTag" :key="index">{{item}}</el-tag>
            </div>
          </div>
          <div class="classTag">
            <div class="label">专业标签：</div>
            <div class="span">
              <el-tag type="white" v-for="(item, index) in userInfo.projectTag" :key="index">{{item}}</el-tag>
            </div>
          </div>
          <div class="classTag">
            <div class="label">进步标签：</div>
            <div class="span">
              <el-tag type="white" v-for="(item, index) in userInfo.learningTag" :key="index">{{item}}</el-tag>
            </div>
          </div>
          <div class="classTag">
            <div class="label">拜师理由：</div>
            <div class="span">{{userInfo.refuseContent}}</div>
          </div>
        </div>
      </div>
      <div class="right-con">
        <div class="labs-con">
          <div class="data-lab" v-for="lab in labList" :key="lab.id">
            <div class="count">{{lab.data}}</div>
            <div class="labTitle"><span>{{lab.labTitle}}</span></div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="confirm">
      <div class="title">是否接受他的拜师申请？</div>
      <div class="button-list">
        <iep-button type="primary" @click="handleConfirm(1)" v-loading="confirmState">确认</iep-button>
        <iep-button @click="handleClose" v-loading="confirmState">拒绝</iep-button>
      </div>
    </div>
    <!-- 拒绝理由 -->
    <iep-dialog :dialog-show="dialogShow" title="拒绝拜师" width="520px" @close="close">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
        <el-form-item label="拒绝拜师理由：" prop="reason">
          <iep-input-area v-model="form.reason"></iep-input-area>
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
import { getApprenticeUser, characterIsDetermine } from '@/api/cpms/characterrelations'

const initFormData = () => {
  return {
    reason: '',
  }
}

export default {
  data () {
    return {
      isShow: false,
      labList: [
        {
          data: '--',
          labTitle: '信用值',
        },
        {
          data: '--',
          labTitle: '活跃度',
        },
        {
          data: '--',
          labTitle: '资产排名',
        },
      ],
      userInfo: {
        projectTag: [],
      },
      apprenticeShow: false,
      params: this.$route.params,
      confirmState: false,
      dialogShow: false,
      form: initFormData(),
      rules: {
        reason: [
          { required: true, message: '请输入你的拒绝理由', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
    // 获取用户信息
    getUserDetail (id) {
      getApprenticeUser(id).then(({ data }) => {
        let obj = data.data
        this.userInfo = obj
      })
    },
    // 取消
    handleClose () {
      this.dialogShow = true
    },
    submitForm () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.handleConfirm(2)
        }
      })
    },
    close () {
      this.form = initFormData()
      this.dialogShow = false
    },
    handleConfirm (type) {
      this.confirmState = true
      characterIsDetermine({ characterStatus: type }, { characterId: this.params.id, refuseContent: this.form.reason }).then(() => {
        this.confirmState = false
        this.$message.success('操作成功')
        this.$router.push('/wel/relationship_manage')
      })
    },
  },
  created () {
    this.params = this.$route.params
    this.getUserDetail(this.params.id)
  },
}
</script>
<style lang="scss" scoped>
.hide {
  display: none;
}
.dib {
  display: inline-block;
}
.personal-top {
  width: 1200px;
  margin: 30px auto;
  .box-card {
    .img-con {
      display: flex;
      margin-top: 15px;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      align-content: center;
      .img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid #ebeef5;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
          transition: 0.5s;
          border-radius: 50%;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
    .labs-con {
      display: flex;
      justify-content: space-between;
      .data-lab {
        padding: 0 20px;
        border-right: 1px solid #eee;
        text-align: center;
        .labTitle {
          color: #999;
        }
      }
    }
    .text {
      flex: 2;
      margin-left: 30px;
      padding-right: 20px;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .mark {
        margin: 0 5px;
      }
    }
    .classTags {
      margin-top: 20px;
      transition: all 0.5s;
      .text-btn {
        color: #666;
        &:hover {
          color: #999;
        }
      }
    }
    .classTag {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 80px;
      }
      .span {
        flex: 1;
      }
      .el-tag {
        margin-right: 5px;
        margin-bottom: 5px;
        &:hover {
          color: $--menu-color-primary;
          background: #fef0f0;
          border-color: $--menu-color-primary;
        }
        // &:last-child {
        //   overflow: hidden;
        //   text-overflow: ellipsis;
        //   white-space: nowrap;
        // }
      }
    }
    .right-con {
      display: flex;
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
    }
    .labs-con {
      margin-bottom: 30px;
      .count {
        font-size: 24px;
      }
      .data-lab {
        &:nth-child(3) {
          border: 0;
        }
      }
    }
    .name-con {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      margin-bottom: 10px;
      .name {
        margin-right: 10px;
        font-size: 20px;
      }
    }
    .autograph {
      color: #666;
    }
    .dn {
      opacity: 0;
    }
    .show {
      opacity: 1;
    }
  }
  .confirm {
    text-align: center;
    margin-top: 50px;
    .title {
      font-size: 18px;
    }
    .button-list {
      margin-top: 15px;
      .el-button {
        margin-right: 10px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.personal-top ::v-deep .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.personal-top ::v-deep .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.personal-top ::v-deep .el-button--danger {
  color: #fff;
  background: $--menu-color-primary;
  border-color: $--menu-color-primary;
}
.personal-top ::v-deep .el-button--danger:hover {
  color: $--menu-color-primary;
  background: #fef0f0;
  border-color: $--menu-color-primary;
}
.personal-top ::v-deep .el-button--danger.is-plain {
  color: $--menu-color-primary;
  background: #fef0f0;
  border-color: $--menu-color-primary;
}
.personal-top ::v-deep .el-button--danger.is-plain:hover {
  color: #fff;
  background: $--menu-color-primary;
}
</style>
