<template>
  <div class="personal-top">
    <el-card class="box-card" shadow="hover">
      <div class="content">
        <div class="info">
          <div class="img-con">
            <div class="img"><iep-img :src="user_info.avatar" alt=""></iep-img></div>
            <span class="num">{{user_info.staffId}}</span>
            <span class="integrity">
              <div class="integrity-desc">资料完善度{{`${user_info.integrity}%`}}</div>
              <el-progress :percentage="user_info.integrity" :color="integrityColors" :show-text="false"></el-progress>
            </span>
          </div>
          <div class="text">
            <div class="name-con">
              <span class="name">{{user_info.name}}</span>
              <span class="post">{{user_info.positionName}}
                <!-- <span class="dn show1" :class="show1">V</span>
                <span class="dn show2 el-icon-star-on" :class="show2"></span>
                <span class="dn show3 iconfont icon-huangguan" :class="show2"></span> -->
                <iep-identity-mark class="mark" :icon="item.icon" :title="item.label" v-for="(item, index) in user_info.identityMarks" :key="index"></iep-identity-mark>
              </span>
            </div>
            <span class="autograph">个性签名：{{user_info.signature}}</span>
            <div class="classTags">
              <div class="classTag">
                <div class="label">卓越标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.abilityTag" :key="index">{{item}}</el-tag>
                </div>
              </div>
              <div class="classTag">
                <div class="label">专业标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.projectTag" :key="index">{{item}}</el-tag>
                </div>
              </div>
              <div class="classTag">
                <div class="label">进步标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.learningTag" :key="index">{{item}}</el-tag>
                </div>
              </div>
              <div class="classTag more" v-if="!userInfoShow">
                <div class="label" @click="()=>{userInfoShow=true}">查看更多<i class="el-icon-arrow-down"></i></div>
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
            <el-row>
              <el-button size="mini" type="danger" plain @click="handleEmail">邮件</el-button>
              <el-button size="mini" type="danger" plain @click="handleApprentice">拜师</el-button>
              <el-button size="mini" type="danger" plain @click="handleReward">打赏</el-button>
              <el-button size="mini" type="info" plain disabled>PK</el-button>
            </el-row>
          </div>
        </div>
        <moreTemplate v-if="userInfoShow" :userInfo='user_info' @handleClose="()=> {userInfoShow=false}"></moreTemplate>
      </div>
    </el-card>

    <!-- 邮件 -->
    <email-dialog ref="email"></email-dialog>
  </div>
</template>

<script>
import EmailDialog from '@/views/app/components/email/'
import moreTemplate from './moreTemplate/'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { EmailDialog, moreTemplate },
  props: {
    user_info: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data () {
    return {
      isShow: false,
      show1: 'show',
      show2: 'show',
      show3: 'show',
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
      userInfoShow: false,
      integrityColors: '#66cb68',
    }
  },
  methods: {
    show () {
      this.name = 'el-icon-arrow-up',
        this.isShow = !this.isShow
    },
    // 拜师
    ...mapActions(['ApprenticeApply']),
    handleApprentice () {
      if (this.userInfo.userId == this.user_info.id) {
        this.$message.error('无法向自己拜师')
        return
      }
      this.ApprenticeApply({id: this.user_info.id, name: this.user_info.name})
    },
    // 邮件
    handleEmail () {
      let receiverList = {
        unions: [],
        orgs: [],
        users: [{id: this.user_info.id, name: this.user_info.name}],
      }
      this.$refs['email'].open({receiverList: receiverList})
    },
    // 打赏
    ...mapActions(['famsReward']),
    handleReward () {
      if (this.userInfo.userId == this.user_info.id) {
        this.$message.error('无法向自己打赏')
        return
      }
      this.famsReward({id: this.user_info.id, name: this.user_info.name})
    },
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
  margin-top: 30px;
  .box-card {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .content {
      width: 100%;
    }
    .info {
      display: flex;
    }
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
      .integrity {
        margin-top: 30px;
        font-size: 12px;
        text-align: center;
        width: 100%;
        .integrity-desc {
          margin-bottom: 5px;
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
      margin-bottom: 10px;
      display: flex;
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
          color: #cb3737;
          background: #fef0f0;
          border-color: #cb3737;
        }
      }
    }
    .more {
      cursor: pointer;
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
    .show1 {
      display: inline-block;
      margin: 0 5px 0 10px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      background-color: #cb3737;
      color: #fff;
    }
    .show2 {
      display: inline-block;
      margin-right: 5px;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      text-align: center;
      background-color: #ff9961;
      color: #fff;
    }
    .show3 {
      display: inline-block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      text-align: center;
      background-color: #fec751;
      color: #fff;
    }
  }
}
</style>
<style scoped>
.personal-top >>> .el-card__body {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}
.personal-top >>> .el-tag--white {
  border: 1px solid #dcdfe6;
  height: 28px;
  line-height: 26px;
  background: #fff;
  color: #606266;
}
.personal-top >>> .el-button--danger {
  color: #fff;
  background: #cb3737;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger:hover {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger.is-plain {
  color: #cb3737;
  background: #fef0f0;
  border-color: #cb3737;
}
.personal-top >>> .el-button--danger.is-plain:hover {
  color: #fff;
  background: #cb3737;
}
</style>
