<template>
  <div class="main-box">
    <div class="main-container">
      <div class="top-title bg-title">
        <div v-if="$route.query.first">
          <el-button type="success" icon="el-icon-check" circle></el-button>
          恭喜你，
          <span class="org-name">
            {{userInfo.orgName}}
          </span>
          创建成功！
        </div>
        <div v-else>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <span class="org-name">
            {{userInfo.orgName}}
          </span>
          的管理者您好
        </div>
        <div class="desc">
          分享邀请组织成员，迁移群资源更方便
        </div>
        <div class="btn-column">
          <iep-button type="primary" size="medium" style="margin-right:5px;" v-popover:popover>二维码邀请</iep-button>
          <iep-button type="primary" size="medium" plain v-copy="copyUrlText">{{IS_ICAN?'复制SO链接':'复制组织链接'}}</iep-button>
        </div>
      </div>
      <div class="container">
        <div class="container-content">
          <div class="main-org">
            <div class="title-item">
              完善SO，获取{{IS_ICAN?'能贝':'国脉贝'}}
            </div>
            <div class="org-task">
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.createdOrg" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info">
                  <div class="info-name">创建SO</div>
                  <div class="info-desc">为您的组织搭建一个“浅交流、深协作”的新圈子</div>
                </div>
                <div class="reward">
                  <get-button v-if="form.createdOrg === 1" :rules="rules" :id="0" @load-page="loadPage"></get-button>
                  <div v-else>
                    <iep-button class="btn-block" round>{{form.createdOrg?'已':'未'}}完成</iep-button>
                    <!-- <iep-button round v-if="form.createdOrg === -1"> +{{rules[0]}} 贝</iep-button> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.finishInfo" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" @click="$openPage('/goms/basic_configuration/organization_information?is_guide=true')">
                  <div class="info-name">完善SO</div>
                  <div class="info-desc">完善您的组织信息，组织主页将更有吸引力</div>
                </div>
                <div class="reward">
                  <get-button v-if="form.finishInfo === 1" :rules="rules" :id="1" @load-page="loadPage"></get-button>
                  <div v-else>
                    <iep-button class="btn-block" round>{{form.finishInfo?'已':'未'}}完成</iep-button>
                    <!-- <iep-button round v-if="form.finishInfo === -1"> +{{rules[1]}} 贝</iep-button> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.extendMember>=10 || form.extendMember === -1" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" @click="$openPage('/goms/member_management')">
                  <div class="info-name">添加成员</div>
                  <div class="info-desc">为您的组织搭添加10个以上成员，开启更多赋能功能</div>
                </div>
                <div class="reward">
                  <get-button v-if="form.extendMember >= 10" :rules="rules" :id="2" @load-page="loadPage"></get-button>
                  <div v-else>
                    <iep-button class="btn-block" round>{{form.extendMember === -1?'已':'未'}}完成</iep-button>
                    <!-- <iep-button round v-if="form.extendMember>=0">{{form.extendMember}} / 10</iep-button> -->
                    <!-- <iep-button round v-if="form.extendMember === -1"> +{{rules[2]}} 贝</iep-button> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <!-- <i v-if="form.distribution" class="el-icon-success success"></i> -->
                  <i class="el-icon-warning-outline"></i>
                </div>
                <div class="info" :style='disabled'>
                  <div class="info-name">SO认证</div>
                  <div class="info-desc">创建者、组织进行认证，获取更多组织方服务</div>
                </div>
                <div class="reward">
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <iep-button class="btn-block" round disabled>{{form.orgCert?'已':'未'}}完成</iep-button>
                    <!-- <span v-if="form.distribution === -1" class="money-text"> +{{rules[3]}} 贝</span> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <!-- <i v-if="form.distribution" class="el-icon-success success"></i> -->
                  <i class="el-icon-edit"></i>
                </div>
                <div class="info">
                  <div class="info-name">发布信息</div>
                  <div class="info-desc">发<span class="red" @click.stop="$openPage('/wel/thoughts/thought_mine')">说说</span>，发<span class="red" @click.stop="$openPage('/wel/material/datum')">文章</span>，发<span class="red" @click.stop="$openPage('/atms/add')">任务</span></div>
                </div>
                <div class="reward">
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <iep-button class="btn-block" round disabled>长期有效</iep-button>
                    <!-- <span v-if="form.distribution === -1" class="money-text"> +{{rules[3]}} 贝</span> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.distribution" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" @click="$openPage('/goms/role_management?is_guide=true')">
                  <div class="info-name">权限管理</div>
                  <div class="info-desc">为成员设立角色，分配权限</div>
                </div>
                <div class="reward">
                  <get-button v-if="form.distribution === 1" :rules="rules" :id="3" @load-page="loadPage"></get-button>
                  <div v-else>
                    <iep-button class="btn-block" round>{{form.distribution?'已':'未'}}完成</iep-button>
                    <!-- <iep-button round v-if="form.distribution === -1"> +{{rules[3]}} 贝</iep-button> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.buildDept>=2 || form.buildDept === -1" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" @click="$openPage('/hrms/organizational_structure/department_management?is_guide=true')">
                  <div class="info-name">创建部门</div>
                  <div class="info-desc">科学动态组织设计，为您的组织创建 2 个部门</div>
                </div>
                <div class="reward">
                  <get-button v-if="form.buildDept>=2" :rules="rules" :id="4" @load-page="loadPage"></get-button>
                  <div v-else>
                    <iep-button class="btn-block" round>{{form.buildDept === -1?'已':'未'}}完成</iep-button>
                    <!-- <iep-button round v-if="form.buildDept>=0">{{form.buildDept}} / 2</iep-button> -->
                    <!-- <iep-button round v-if="form.buildDept === -1"> +{{rules[4]}} 贝</iep-button> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <!-- <i v-if="form.distribution" class="el-icon-success success"></i> -->
                  <i class="el-icon-warning-outline"></i>
                </div>
                <div class="info" :style='disabled'>
                  <div class="info-name">产品发布</div>
                  <div class="info-desc">发布你的产品，代理更多产品</div>
                </div>
                <div class="reward">
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <iep-button class="btn-block" round disabled>{{form.productMarket?'已':'未'}}完成</iep-button>
                    <!-- <span v-if="form.distribution === -1" class="money-text"> +{{rules[3]}} 贝</span> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="congratulations-wrapper bg-congratulations">
              <div class="big-title">开放-赋能-协作</div>
              <operation-wrapper>
                <iep-button type="primary" size="medium" @click="$openPage('/')">即刻迈进智慧组织</iep-button>
              </operation-wrapper>
            </div>
          </div>
          <el-card class="org-card-wrapper" shadow="never">
            <iep-img :src="form.logo" class="image"></iep-img>
            <div class="org-desc">
              <div style="font-size: 16px;">{{form.name}}</div>
              <div style="font-size: 12px;margin-top: 5px;">
                <div>创建人：{{form.creatorName}}</div>
                <div>成立时间：{{form.establishTime | parseToDay}}</div>
              </div>
            </div>
            <div class="org-finish">
              <div style="margin-bottom: 10px;">信息完成度</div>
              <el-progress :text-inside="true" :stroke-width="20" :percentage="+form.integrity" status="exception"></el-progress>
            </div>
            <div class="text">
              <div class="text-tips">
                <!-- 如有疑问，欢迎联系<span class="red" @click="$openPage('http://wpa.qq.com/msgrd?v=3&amp;uin=390694766&amp;site=qq:390694766&amp;menu=yes', 'url')">客服小能</span> -->
                如有疑问，欢迎联系客服<span class="red" @click="toChatUser()">小能</span>
              </div>
              <!-- <div class="btn-link">
                <iep-button type="primary" size="medium">联系小能</iep-button>
              </div> -->
            </div>
          </el-card>
        </div>
        <el-popover ref="popover" placement="right" width="100" trigger="hover" v-model="popoverShow">
          <qrcode class="code" :value="mUrlText" :options="{width:120}"></qrcode>
          <div>右击图片复制下载</div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgGuideDrivers } from '@/api/admin/guide'
import GetButton from './GetButton'
export default {
  components: {
    GetButton,
  },
  data () {
    return {
      popoverShow: false,
      // 创建组织 0 完善组织 1 成员 2 权限 3 部门 4
      rules: [1, 1, 10, 1, 2],
      form: {
        name: '',
        logo: '',
        creatorName: '',
        integrity: '',
        establishTime: '',
        createdOrg: 0,
        finishInfo: 0,
        extendMember: 0,
        distribution: 0,
        buildDept: 0,
        releaseInfo: 0,//发布信息
        orgCert: 0, //组织认证
        productMarket: 0,//产品超市/代理
      },
      //eslint-disable-next-line
      IS_ICAN,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    copyUrlText () {
      return `${window.location.origin}/wel/org?orgId=${this.form.orgId}&type=0`
    },
    mUrlText () {
      ///so/orgDetail/${this.userInfo.orgId}?redirect=so/orgDetail/${this.userInfo.orgId}
      return `${window.location.origin}/so/orgDetail/${this.form.orgId}?redirect=so/orgDetail/${this.form.orgId}`
    },
    disabled () {
      return { backgroundColor: '#f3f3f3', cursor: 'no-drop' }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    toChatUser () {
      const chat = {
        id: '1016',
        chatNo: 'user1016',
        username: 'woneng',
        chatName: '小能',
        avatar: '//cloud.govmade.com/woneng//upload/20190903/acc1ff08-7369-49ee-ac5f-6de04f2f9232_logo (1).png',
      }
      this.$store.dispatch('updateCurrentChat', { chat, show: true })
    },
    async loadPage () {
      const { data } = await getOrgGuideDrivers()
      this.form = { ...data.data }
      this.$set(this, 'rules', data.data.rules)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-block {
  width: 78px;
}
.bg-title {
  margin: 20px;
  background-image: url("/img/orgWlecome/top.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
}
.bg-congratulations {
  margin-bottom: 20px;
  background-image: url("/img/orgWlecome/line.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 30px;
  border-radius: 5px;
  padding: 15px;
}
.red {
  color: $--menu-color-primary;
  &:hover {
    color: $--menu-color-font;
  }
}
.congratulations-wrapper {
  margin-right: 20px;
  .big-title {
    font-size: 20px;
    color: $--menu-color-primary;
  }
  font-size: 16px;
  text-align: center;
  line-height: 50px;
}
.main-org {
  width: 100%;
}
.org-task {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //flex: 1;
  &::after {
    position: absolute;
    top: 20px;
    left: 49px;
    bottom: 20px;
    content: "";
    width: 2px;
    background-color: #eee;
    z-index: -1;
  }
  .task-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: 15px;
    .icon {
      flex: 0 0 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      background-color: #fff;
      .success {
        color: $--menu-color-primary;
      }
    }
    .info {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border: 1px solid #eee;
      cursor: pointer;
      .info-name {
        flex: 0 0 120px;
        font-size: 17px;
      }
      .info-desc {
        flex: 1;
      }
      &:hover {
        background: #f3f3f3;
        .info-name {
          color: $--menu-color-primary;
        }
      }
    }
    .reward {
      flex: 0 0 150px;
      text-align: center;
    }
  }
}
.main-box {
  .main-container {
    margin: 0 auto;
    width: 100%;
    .container-content {
      display: flex;
    }
    .container {
      margin-top: 20px;
      padding: 0 20px;
      .title-item {
        padding: 5px 0 30px 30px;
        font-size: 20px;
      }
      .org-card-wrapper {
        border: none;
        border-left: 1px solid #eee;
        flex: 0 0 300px;
        .image {
          height: 124px;
        }
        .org-desc {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        .org-finish {
          padding-top: 10px;
          margin-bottom: 30px;
        }
        .btn-link {
          text-align: center;
        }
        .text {
          line-height: 28px;
          .text-tips {
            margin-bottom: 15px;
            text-align: center;
            .red {
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.top-title {
  height: 179px;
  border-radius: 5px;
  font-size: 20px;
  padding: 20px;
  .desc {
    margin: 10px 0 15px 0;
    padding-left: 36px;
    font-size: 14px;
    color: #999;
  }
  .btn-column {
    padding-left: 36px;
  }
  .success {
    color: #20d170;
    font-size: 30px;
  }
  .org-name {
    font-size: 30px;
    color: $--color-primary;
  }
}
</style>
