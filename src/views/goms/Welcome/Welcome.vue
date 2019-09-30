<template>
  <div>
    <div class="main-container">
      <div class="top-title">
        <i class="el-icon-circle-check success"></i>
        恭喜你，
        <span class="org-name">
          {{userInfo.orgName}}
        </span>
        创建成功！
        <div class="desc">
          恭喜您已成功开启智慧组织之旅，您还需要招兵买马、备足粮草不断提升您组织的信用与竞争力！
        </div>
      </div>
      <div class="container">
        <el-card class="org-card-wrapper" shadow="hover">
          <img :src="form.logo" class="image">
          <div class="org-desc">
            <div style="font-size: 16px;">{{form.name}}</div>
            <div style="font-size: 12px;margin-top: 5px;">
              <div>负责人：{{form.creatorName}}</div>
              <div>成立时间：{{form.establishTime | parseToDay}}</div>
            </div>
          </div>
          <div class="org-finish">
            <div style="margin-bottom: 10px;">信息完成度</div>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="+form.integrity" status="exception"></el-progress>
          </div>
        </el-card>
        <div class="org-task">
          <div class="task-item">
            <div class="icon">
              <i v-if="form.createdOrg" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">创建组织</div>
              <div class="info-desc">立即开启您的智慧组织之旅</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <iep-button v-if="form.createdOrg === 1" class="money" type="primary" @click="handleGet(1)" round>立即领取</iep-button>
              <div v-else>
                <span>{{form.createdOrg?'':'未'}}完成</span>
                <span v-if="form.createdOrg === -1" class="money-text"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.finishInfo" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info" @click="$openPage('/goms/basic_configuration/organization_information?is_guide=true')">
              <div class="info-name">完善组织详情</div>
              <div class="info-desc">充分展示组织优势，提升组织信用，获得更多协作机会</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <iep-button v-if="form.finishInfo === 1" class="money" type="primary" @click="handleGet(2)" round>立即领取</iep-button>
              <div v-else>
                <span>{{form.finishInfo?'':'未'}}完成</span>
                <span v-if="form.finishInfo === -1" class="money-text"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.extendMember>=10 || form.extendMember === -1" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">拓展组织成员</div>
              <div class="info-desc">立即分享二维码，邀请好友，邀请 1 个 +1 贝
                <iep-button type="primary" size="mini" v-popover:popover plain>入驻邀请</iep-button>
              </div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <iep-button v-if="form.extendMember >= 10" class="money" type="primary" @click="handleGet(3)" round>立即领取</iep-button>
              <div v-else>
                <span>{{form.extendMember>=10 || form.extendMember === -1?'':'未'}}完成</span>
                <span class="money-text" v-if="form.extendMember>=0">{{form.extendMember}} / 10</span>
                <span v-if="form.extendMember === -1" class="money-text"> +10 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.distribution" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info" @click="$openPage('/goms/role_management?is_guide=true')">
              <div class="info-name">分配成员角色</div>
              <div class="info-desc">充分赋予成员相应权限，发挥成员无限价值</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <iep-button v-if="form.distribution === 1" class="money" type="primary" @click="handleGet(4)" round>立即领取</iep-button>
              <div v-else>
                <span>{{form.distribution?'':'未'}}完成</span>
                <span v-if="form.distribution === -1" class="money-text"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.buildDept>=2 || form.buildDept === -1" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info" @click="$openPage('/hrms/organizational_structure/department_management?is_guide=true')">
              <div class="info-name">设立部门</div>
              <div class="info-desc">完善组织架构，持续促进组织的成长与发展，创建 1 个 +1 贝</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <iep-button v-if="form.buildDept>=2" class="money" type="primary" @click="handleGet(5)" round>立即领取</iep-button>
              <div v-else>
                <span>{{form.buildDept>=2 || form.buildDept === -1?'':'未'}}完成</span>
                <span class="money-text" v-if="form.buildDept>=0">{{form.buildDept}} / 2</span>
                <span v-if="form.buildDept === -1" class="money-text"> +10 贝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <iep-divider></iep-divider>
    <div class="congratulations-wrapper">
      <div class="big-title">再一次恭喜您，您的组织竞争力优于<span>80%</span>的组织！</div>
      <div>您可以选择</div>
      <operation-wrapper>
        <iep-button size="medium">继续学习如何打造智慧组织</iep-button>
        <iep-button size="medium" @click="$openPage('/goms/work_bench')">即刻迈进智慧组织</iep-button>
      </operation-wrapper>
    </div>
    <div class="footer-container">
      <img src="/img/bg/org-wel.webp" alt="org-wel">
      <div></div>
      <div class="text">
        <div>
          如果您有相关疑问需要解答，
        </div>
        <div>
          请随时联系客服小能，小能欢迎您的叨扰！
        </div>
        <div>
          <iep-button type="primary" size="medium">联系客服</iep-button>
        </div>
      </div>
    </div>
    <el-popover ref="popover" placement="right" width="100" trigger="hover" v-model="popoverShow">
      <qrcode class="code" :value="mUrlText" :options="{width:120}"></qrcode>
      <el-link :underline="false" icon="el-icon-link" v-copy="copyUrlText">复制组织链接</el-link>
    </el-popover>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrgGuideDrivers, getOrgGuideStep } from '@/api/admin/guide'
export default {
  data () {
    return {
      popoverShow: false,
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
      },
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
    },
  },
}
</script>

<style lang="scss" scoped>
.footer-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 70px;
  height: 400px;
  background: url("/img/bg/org-bg.webp") no-repeat;
  background-size: contain;
  .text {
    font-size: 18px;
    line-height: 50px;
  }
}
.congratulations-wrapper {
  .big-title {
    font-size: 20px;
  }
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  span {
    color: $--menu-color-primary;
    font-size: 25px;
  }
}
.org-task {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .task-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .icon {
      flex: 0 0 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
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
        flex: 0 0 150px;
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
      flex: 0 0 250px;
      display: flex;
      justify-content: space-between;
      .money {
        margin-left: 20px;
      }
      .money-text {
        color: $--menu-color-primary;
      }
    }
  }
}
.main-container {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 1200px;
  padding-bottom: 20px;
  .container {
    display: flex;
    margin-top: 40px;
    .org-card-wrapper {
      flex: 0 0 250px;
      .image {
        width: 208px;
        height: 124px;
      }
      .org-desc {
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .org-finish {
        padding-top: 10px;
      }
    }
  }
}
.top-title {
  border: 1px solid #d8d8d8;
  background: #f3f3f3;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  .desc {
    font-size: 16px;
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
