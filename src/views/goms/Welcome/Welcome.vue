<template>
  <div>
    <basic-container>
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
        <div class="title-label">你还需要：</div>
        <div class="block-wrapper">
          <el-button class="block-btn" @click="$openPage('/goms/basic_configuration/organization_information')" plain>完善信息赚取{{moneyName}}</el-button>

          <el-button class="block-btn" v-popover:popover plain>孤单一人？+邀请好友</el-button>
          <el-button class="block-btn" v-show="false" @click="$openPage('//www.icanvip.net/agent', 'url')" plain>代理{{keyword}}赢取财富</el-button>
        </div>
        <div class="title-label">完善信息有哪些好处？</div>
        <div class="block-wrapper">
          <el-button class="block-btn" plain>
            <div class="big-icon">
              <i class="icon-weath2"></i>
            </div>
            <span>获得{{moneyName}}</span>
          </el-button>
          <el-button class="block-btn" plain>
            <div class="big-icon">
              <i class="icon-zuzhi"></i>
            </div>
            <span>吸引其他人加入你的组织</span>
          </el-button>
          <el-button class="block-btn" plain>
            <div class="big-icon">
              <i class="icon-qiyejianjie"></i>
            </div>
            <span>代理{{keyword}}赢取财富</span>
          </el-button>
        </div>
      </div>
      <el-popover ref="popover" placement="bottom" width="336" trigger="click">
        <iep-img src="/img/qrcode.webp"></iep-img>
      </el-popover>
    </basic-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      orgName: '金融之家',
      keyword: '内网',
      moneyName: '国脉贝',
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  margin: 50px auto;
  .title-label {
    font-size: 16px;
    margin-top: 20px;
  }
  .block-wrapper {
    display: flex;
    margin-top: 20px;
    .big-icon {
      > i {
        font-size: 40px;
      }
      margin-bottom: 10px;
    }
    .block-btn {
      padding: 40px 0;
      font-size: 16px;
      display: block;
      width: 100%;
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
