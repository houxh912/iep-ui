<template>
  <el-card class="account-wrapper" shadow="never" :body-style="bodyStyle">
    <div class="user-simple-box">
      <div class="user-info">
        <iep-img class="user-avatar" :src="userInfo.avatar" @click.native="$openPage(`${ICAN_URL}/master/${userInfo.userId}.html`,'bind')"></iep-img>
        <iep-div-detail class="user-code" :value="form.staffId"></iep-div-detail>
      </div>
      <el-tooltip class="item" effect="dark" content="资料完善度" placement="top">
        <el-progress :percentage="form.integrity" color="#68C769"></el-progress>
      </el-tooltip>
    </div>
    <div class="user-detail-box">
      <div class="user-welcome-box">
        <span class="user-text">{{timeFix}}，{{form.name}}</span>
        <iep-identity-mark v-for="item in form.identityMarks" :key="item.value" :icon="item.icon" :title="item.label"></iep-identity-mark>
        <span class="welcome-text">{{welcome}}</span>
      </div>
      <div class="user-position-tags-box">
        <div class="user-position-operation-box">
          <div class="user-position-box">
            <iep-div-detail class="position-item title-label" :value="form.title" nullmsg="暂无职称"></iep-div-detail>
            <iep-div-detail class="position-item job-label" :value="form.job" nullmsg="暂无岗位"></iep-div-detail>
          </div>
          <div class="user-operation-box">
            <div class="operation-box-con">
              <iep-button class="leader-btn" type="primary" size="mini" icon="el-icon-notebook-1" plain @click="handManage()">通讯录</iep-button>
              <iep-button v-if="permissions.wel_leadership_desktop" class="leader-btn" size="mini" icon="el-icon-monitor" type="primary" plain @click="handleSome2()">领导桌面</iep-button>
              <iep-button class="leader-btn" icon="el-icon-chat-dot-square" size="mini" plain @click="$openPage('http://wpa.qq.com/msgrd?v=3&amp;uin=390694766&amp;site=qq:390694766&amp;menu=yes', 'url')">联系客服</iep-button>
            </div>
            <div class="user-tags-box">
              <div class="user-height">
                <div class="user-tag">
                  <div class="count" @click="handleSome3()">{{form.tagNum}}</div>
                  <div class="name">标签
                    <iep-tip class="tag-icon" icon="el-icon-question" content="您的个人标签总数">
                    </iep-tip>
                  </div>
                </div>
                <div class="user-tag">
                  <div class="count" @click="handleSome4()">{{form.materialNum}}</div>
                  <div class="name">材料
                    <iep-tip class="tag-icon" icon="el-icon-question" content="您上传材料的总数量">
                    </iep-tip>
                  </div>
                </div>
                <div class="user-tag">
                  <div class="count" @click="handleSome5()">{{form.credit}}</div>
                  <div class="name">信用
                    <iep-tip class="tag-icon" icon="el-icon-question" content="个人信用是基于内网创建的一套征信系统，依据个人在内网中的各项行为数据，<br/>运用云计算和机器学习等技术，对各维度数据进行综合处理和评估，<br/>在个人工作、学习、管理、协作四个维度客观呈现个人信用状况的综合分值。<br/>信用值的高低将影响项目承接机会、企业内部投资、员工提拔、晋升、领导表扬/奖励及享受特权的重要依据。">
                    </iep-tip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>
<script>
import { getIndex } from '@/api/wel/index'
import { timeFix, welcome } from '@/util/text'
import { mapGetters } from 'vuex'
const initIndexForm = () => {
  return {
    name: '', //名字
    staffId: '', //工号
    identityMarks: [],
    job: '', //职位
    title: '',//职称
    tagNum: 10,//标签
    materialNum: 10,//材料
    credit: 10,//信用
    integrity: 0, // 资料完善度
  }
}
export default {
  data () {
    return {
      // eslint-disable-next-line
      ICAN_URL,
      timeFix: timeFix(),
      welcome: welcome(),
      form: initIndexForm(),
      bodyStyle: {
        display: 'flex',
        padding: '0',
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'permissions',
    ]),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handManage () {
      this.$router.push({
        path: '/wel/relationship_manage',
      })
    },
    handleSome2 () {
      this.$openPage('/wel/desktop')
    },
    handleSome3 () {
      this.$openPage('/app/tag_library')
    },
    handleSome4 () {
      this.$openPage('/wel/material/datum')
    },
    handleSome5 () {
      this.$message('个人信用评分, 功能开发中')
    },
    loadPage () {
      this.loading = true
      getIndex().then(({ data }) => {
        this.form = this.$mergeByFirst(initIndexForm(), data.data)
        this.loading = false
        this.$emit('on-finish')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.account-wrapper {
  margin: 20px;
  margin-bottom: 0;
}
.user-position-tags-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.user-position-operation-box {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
}
.user-simple-box {
  border-right: 2px dotted #eee;
  margin: 4px 0;
  padding: 7px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  .user-info {
    display: flex;
    margin-top: 5px;
    flex-direction: column;
    align-items: center;
  }
}
.user-detail-box {
  display: flex;
  flex: 5;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 20px 20px 15px;
  .user-welcome-box {
    .user-title {
      font-size: 16px;
    }
    .welcome-text {
      margin-left: 10px;
      font-size: 16px;
      color: $--menu-color-primary;
    }
  }
  .user-position-box {
    display: flex;
    margin: 5px 0;
    justify-content: center;
    align-items: center;
  }
  .user-operation-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .operation-box-con {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .leader-btn {
      margin-left: 10px;
      i {
        font-size: 14px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
    .inline {
      justify-content: center;
      display: inline-flex;
      align-items: center;
      .padding {
        padding-right: 5px;
        font-size: 18px;
      }
    }
  }
}
.user-tags-box {
  padding-left: 20px;
  display: flex;
  flex: 0 0 250px;
  justify-content: space-around;
  align-items: center;
  .user-height {
    display: flex;
    width: 100%;
    height: 50px;
  }
  .user-tag {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ececec;
    &:last-child {
      border: none;
    }
    .count {
      font-size: 24px;
      color: #484848;
      cursor: pointer;
      &:hover {
        color: rgb(172, 172, 172);
      }
    }
    .name {
      color: #bbb;
    }
  }
}
.user-avatar {
  cursor: pointer;
  width: 74px;
  height: 74px;
}
.user-code {
  margin-bottom: 5px;
  font-size: 13px;
  color: #444;
  line-height: 20px;
}
.position-item {
  display: inline;
  &.title-label {
    color: #7a7a7a;
  }
  &.job-label {
    margin-left: 10px;
    padding: 3px 12px;
    border-radius: 40px;
    border: 1px solid #eee;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
    background-color: #f5f7fa;
    color: #333;
  }
}
</style>
<style scoped>
.user-avatar {
  width: 74px;
  height: 74px;
}
.user-avatar >>> .el-image__inner {
  border-radius: 50%;
}
</style>
