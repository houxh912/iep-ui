<template>
  <div class="main-box">
    <div class="main-container">
      <div class="top-title bg-title">
        <el-button type="success" icon="el-icon-check" circle></el-button>
        恭喜你，
        <span class="org-name">
          {{userInfo.orgName}}
        </span>
        创建成功！
        <div class="desc">
          最优化匹配资源，通过协作、学习、管理、财富深度赋能，开启智慧组织之旅
        </div>
        <div class="btn-column">
          <iep-button type="primary" size="medium" style="margin-right:5px;" v-popover:popover>二维码邀请</iep-button>
          <iep-button type="primary" size="medium" plain v-copy="copyUrlText">{{IS_ICAN?'复制组织链接':'复制SO组织链接'}}</iep-button>
        </div>
      </div>
      <div class="container">
        <div class="container-content">
          <div class="main-org">
            <div class="title-item">
              完善组织，获取{{IS_ICAN?'国脉贝':'能贝'}}
              <span class="step">(第2步/共2步)</span>
            </div>
            <div class="org-task">
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.createdOrg" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info">
                  <div class="info-name">创建组织</div>
                  <div class="info-desc">为您的组织搭建一个<span class="red">“浅交流、深协作”</span>的新圈子</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <iep-button v-if="form.createdOrg === 1" class="money" type="primary" @click="handleGet(1)" round>立即领取</iep-button>
                  <div v-else>
                    <span>{{form.createdOrg?'':'未'}}完成</span>
                    <span v-if="form.createdOrg === -1" class="money-text"> +{{rules[0]}} 贝</span>
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.finishInfo" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" @click="$openPage('/goms/basic_configuration/organization_information?is_guide=true')">
                  <div class="info-name">完善组织</div>
                  <div class="info-desc">完善您的组织信息，组织主页将更有吸引力</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <iep-button v-if="form.finishInfo === 1" class="money" type="primary" @click="handleGet(2)" round>立即领取</iep-button>
                  <div v-else>
                    <span>{{form.finishInfo?'':'未'}}完成</span>
                    <span v-if="form.finishInfo === -1" class="money-text"> +{{rules[1]}} 贝</span>
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
                  <div class="info-desc">为您的组织搭添加10个成员，开启更多赋能功能
                  </div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <iep-button v-if="form.extendMember >= 10" class="money" type="primary" @click="handleGet(3)" round>立即领取</iep-button>
                  <div v-else>
                    <span>{{form.extendMember>=10 || form.extendMember === -1?'':'未'}}完成</span>
                    <span class="money-text" v-if="form.extendMember>=0">{{form.extendMember}} / 10</span>
                    <span v-if="form.extendMember === -1" class="money-text"> +{{rules[2]}} 贝</span>
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.distribution" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" :style='disabled'>
                  <div class="info-name">组织认证</div>
                  <div class="info-desc">创建者、组织进行认证，获取更多组织方服务</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <span>{{form.orgCert?'':'未'}}完成</span>
                    <!-- <span v-if="form.distribution === -1" class="money-text"> +{{rules[3]}} 贝</span> -->
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.distribution" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info">
                  <div class="info-name">发布信息</div>
                  <div class="info-desc">发一条<span class="red" @click.stop="$openPage('/wel/thoughts/thought_mine')">说说</span>，发一篇<span class="red" @click.stop="$openPage('/wel/thoughts/thought_mine')">文章</span>，发一个<span class="red" @click.stop="$openPage('/wel/tasks')">任务商机</span></div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <span>{{form.releaseInfo?'':'未'}}完成</span>
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
                  <div class="info-desc">组织“统一、独立、高度协作”的管理新模式，赋能又赋权</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <iep-button v-if="form.distribution === 1" class="money" type="primary" @click="handleGet(4)" round>立即领取</iep-button>
                  <div v-else>
                    <span>{{form.distribution?'':'未'}}完成</span>
                    <span v-if="form.distribution === -1" class="money-text"> +{{rules[3]}} 贝</span>
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
                  <div class="info-desc">充分挖掘组织潜力，有效分配成员角色与职责</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <iep-button v-if="form.buildDept>=2" class="money" type="primary" @click="handleGet(5)" round>立即领取</iep-button>
                  <div v-else>
                    <span>{{form.buildDept>=2 || form.buildDept === -1?'':'未'}}完成</span>
                    <span class="money-text" v-if="form.buildDept>=0">{{form.buildDept}} / 2</span>
                    <span v-if="form.buildDept === -1" class="money-text"> +{{rules[4]}} 贝</span>
                  </div>
                </div>
              </div>
              <div class="task-item">
                <div class="icon">
                  <i v-if="form.distribution" class="el-icon-success success"></i>
                  <i v-else class="el-icon-warning-outline"></i>
                </div>
                <div class="info" :style='disabled'>
                  <div class="info-name">产品超市/代理</div>
                  <div class="info-desc">充分挖掘组织潜力，有效分配成员角色与职责</div>
                </div>
                <div class="reward">
                  <div class="scan-code"></div>
                  <!-- <iep-button>立即领取</iep-button> -->
                  <div>
                    <span>{{form.productMarket?'':'未'}}完成</span>
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
          <el-card class="org-card-wrapper" shadow="hover">
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
                如有疑问，欢迎联系<span class="red">客服小能</span>
              </div>
              <div class="btn-link">
                <iep-button type="primary" size="medium">联系小能</iep-button>
              </div>
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
import { getOrgGuideDrivers, getOrgGuideStep } from '@/api/admin/guide'
export default {
  data () {
    return {
      popoverShow: false,
      rules: [1, 1, 10, 1, 1],
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
      return `${window.location.origin}/so/invitation/codeShare?redirect=so/orgDetail/${this.form.orgId}`
    },
    disabled () {
      return { backgroundColor: '#f3f3f3', cursor: 'no-drop' }
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    async handleGet (step) {
      const { data } = await getOrgGuideStep(step)
      if (data.data) {
        this.$message.success('领取成功')
        this.loadPage()
      } else {
        this.$message(data.msg)
      }
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
        .red {
          &:hover {
            color: #d48181;
          }
        }
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
      .money {
        margin-left: 20px;
      }
      .money-text {
        color: $--menu-color-primary;
      }
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
        .step {
          font-size: 16px;
        }
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
            .red {
              font-size: 16px;
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
    font-size: 16px;
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
