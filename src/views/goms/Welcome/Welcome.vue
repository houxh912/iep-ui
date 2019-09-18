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
          <img src="//183.131.134.242:10060/upload/iep/201904/11b1fdf3-68a1-41d1-954d-61054b3f9648_20190117093354_036bter376.jpg" class="image">
          <div class="org-desc">
            <div style="font-size: 16px;">国脉集团总部</div>
            <div style="font-size: 12px;margin-top: 5px;">
              <div>负责人：黄磊</div>
              <div>成立时间：2019-01-01</div>
            </div>
          </div>
          <div class="org-finish">
            <div style="margin-bottom: 10px;">信息完成度</div>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="82" status="exception"></el-progress>
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
              <div>
                <span>{{form.createdOrg?'':'未'}}完成</span>
                <span class="money"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.finishInfo" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">完善组织详情</div>
              <div class="info-desc">充分展示组织优势，提升组织信用，获得更多协作机会</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <div>
                <span>{{form.finishInfo?'':'未'}}完成</span>
                <span class="money"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.extendMember===10" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">拓展组织成员</div>
              <div class="info-desc">立即分享二维码，邀请好友，邀请 1 个 +1 贝</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <div>
                <span>{{form.extendMember===10?'':'未'}}完成</span>
                {{form.extendMember}}/10
                <span class="money"> +{{form.extendMember}} 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.distribution" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">分配成员角色</div>
              <div class="info-desc">充分赋予成员相应权限，发挥成员无限价值</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <div>
                <span>{{form.distribution?'':'未'}}完成</span>
                <span class="money"> +1 贝</span>
              </div>
            </div>
          </div>
          <div class="task-item">
            <div class="icon">
              <i v-if="form.buildDept===2" class="el-icon-success success"></i>
              <i v-else class="el-icon-warning-outline"></i>
            </div>
            <div class="info">
              <div class="info-name">设立部门</div>
              <div class="info-desc">完善组织架构，持续促进组织的成长与发展，创建 1 个 +1 贝</div>
            </div>
            <div class="reward">
              <div class="scan-code"></div>
              <div>
                <span>{{form.buildDept===2?'':'未'}}完成</span>
                {{form.buildDept}}/2
                <span class="money"> +{{form.buildDept}} 贝</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      form: {
        createdOrg: false,
        finishInfo: false,
        extendMember: 0,
        distribution: false,
        buildDept: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>

<style lang="scss" scoped>
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
      flex: 0 0 200px;
      display: flex;
      justify-content: space-between;
      .money {
        color: $--menu-color-primary;
      }
    }
  }
}
.main-container {
  margin: 0 auto;
  margin-top: 20px;
  max-width: 1200px;
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
