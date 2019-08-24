<template>
  <div class="personal-top">
    <el-card class="box-card" shadow="hover">
      <div class="content">
        <div class="info">
          <div class="img-con">
            <div class="img">
              <iep-img :src="user_info.avatar" alt=""></iep-img>
            </div>
            <!-- <span class="num">{{user_info.staffId}}</span> -->
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
            <span class="autograph"><span class="autograph-con">个性签名：</span>{{user_info.signature}}</span>
            <div class="classTags">
              <div class="classTag">
                <div class="label">我能标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.abilityTag" :key="index" @click="() => { $openTagDetail(item) }">{{item}}</el-tag>
                </div>
              </div>
              <div class="classTag">
                <div class="label">我要标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.projectTag" :key="index" @click="() => { $openTagDetail(item) }">{{item}}</el-tag>
                </div>
              </div>
              <div class="classTag">
                <div class="label">我想标签：</div>
                <div class="span">
                  <el-tag type="white" v-for="(item, index) in user_info.learningTag" :key="index" @click="() => { $openTagDetail(item) }">{{item}}</el-tag>
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
                <div class="count">{{user_info.rankMap[lab.prop]}}</div>
                <div class="labTitle"><span>{{lab.labTitle}}</span></div>
              </div>
            </div>
            <el-row>
              <el-button size="mini" type="danger" plain @click="handleEmail">邮件</el-button>
              <el-button size="mini" type="danger" plain @click="handleApprentice">拜师</el-button>
              <el-button size="mini" type="danger" plain @click="handleReward">打赏</el-button>
              <el-button size="mini" type="danger" plain @click="handleProposal">建议</el-button>
            </el-row>
            <el-row class="apply">
              <el-button type="danger" plain @click="handleApply">申请授权</el-button>
              <el-button size="mini" type="danger" @click="handlePk" class="no-hover">PK</el-button>
            </el-row>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 邮件 -->
    <email-dialog ref="email"></email-dialog>
  </div>
</template>

<script>
import EmailDialog from '@/views/app/components/email/'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { EmailDialog },
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
      userInfoShow: true,
      labList: [
        {
          prop: 'xyz',
          labTitle: '信用值',
        },
        {
          prop: 'hydpm',
          labTitle: '活跃度排名',
        },
        {
          prop: 'gmbpm',
          labTitle: '财富排名',
        },
        {
          prop: 'sjzc',
          labTitle: '数据资产',
        },
      ],
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
      this.ApprenticeApply({ id: this.user_info.id, name: this.user_info.name })
    },
    // 邮件
    handleEmail () {
      let receiverList = {
        unions: [],
        orgs: [],
        users: [{ id: this.user_info.id, name: this.user_info.name }],
      }
      this.$refs['email'].open({ receiverList: receiverList })
    },
    // 建议
    handleProposal () {
      let userInfo = this.userInfo
      let obj = {
        subject: `${userInfo.realName}的建议`,
        receiverList: {
          unions: [],
          orgs: [],
          users: [{ id: this.user_info.id, name: this.user_info.name }],
        },
      }
      this.$refs['email'].open(obj)
    },
    // pk
    handlePk () {
      this.$router.push('/app/resource/expert?type=1')
    },
    // 打赏
    ...mapActions(['famsReward']),
    handleReward () {
      if (this.userInfo.userId == this.user_info.id) {
        this.$message.error('无法向自己打赏')
        return
      }
      this.famsReward({ id: this.user_info.id, name: this.user_info.name })
    },
    // 申请授权
    handleApply () {
      let userInfo = this.userInfo
      let obj = {
        subject: `${userInfo.realName}向您发起个人资料授权申请`,
        receiverList: {
          unions: [],
          orgs: [],
          users: [{ id: this.user_info.id, name: this.user_info.name }],
        },
      }
      this.$refs['email'].open(obj)
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
      margin-top: 5px;
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
      margin-top: 15px;
      transition: all 0.5s;
      .text-btn {
        color: #666;
        &:hover {
          color: #999;
        }
      }
    }
    .classTag {
      margin-bottom: 0;
      display: flex;
      align-items: flex-start;
      .label {
        margin-bottom: 5px;
        line-height: 28px;
        width: 70px;
        color: #666;
      }
      .span {
        flex: 1;
      }
      .el-tag {
        margin-right: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
    .right-con {
      display: flex;
      margin-top: 15px;
      flex-direction: column;
      align-items: center;
      .el-row {
        width: 100%;
        text-align: right;
        .el-button {
          font-size: 14px;
        }
      }
      .el-button--danger {
        background: #cb3737;
        border-color: #ba1b21;
        padding: 7px 15px;
        min-width: 62px;
      }
      .el-button--danger.is-plain {
        color: #cb3737;
        background: #fef0f0;
        border-color: #cb3737;
      }
      .el-button--danger.is-plain:hover {
        background: #cb3737;
        border-color: #ba1b21;
        color: #fff;
      }
      .apply {
        margin-top: 10px;
        .no-hover:hover {
          background: #cb3737;
          border-color: #ba1b21;
          color: #fff;
        }
      }
    }
    .labs-con {
      margin-bottom: 30px;
      .count {
        font-size: 24px;
      }
      .data-lab {
        &:nth-child(4) {
          border: 0;
        }
      }
    }
    .name-con {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 10px;
      .name {
        margin-right: 10px;
        font-size: 24px;
        font-weight: 700;
      }
    }
    .autograph {
      .autograph-con {
        display: inline-block;
        padding-right: 10px;
        color: #666;
      }
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
  .more {
    cursor: pointer;
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
  position: relative;
  border: 0;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  background: none;
  color: #444;
}
.personal-top >>> .el-tag--white:before {
  position: absolute;
  content: "";
  top: 14px;
  right: -10px;
  width: 15px;
  height: 1px;
  background-color: #aaa;
  transform: rotate(125deg);
  -o-transform: rotate(125deg);
  -moz-transform: rotate(125deg);
  -webkit-transform: rotate(125deg);
}
.personal-top >>> .el-tag--white:last-child:before {
  background: none;
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
