<template>
  <my-content class="my-content" :title-name="`我的SO(${orgs.length})`">
    <template v-slot:stitle>
      <iep-button size="mini" @click="$openPage('/wel/org?type=1')">创建或加入SO</iep-button>
    </template>
    <div class="current-wrapper">
      <div class="current-org">
        <span>{{userInfo.orgName}}</span>
        <iep-button v-if="identity==='创建者'" size="mini" @click="$openPage('/wel/orgwelcome')">完善SO</iep-button>
      </div>
      <div class="current-role">
        <div>
          <span>SO角色：</span>
          <span>{{identity}}</span>
        </div>
        <iep-button type="primary" size="mini" v-popover:popover plain>入驻邀请</iep-button>
      </div>
    </div>
    <div class="org-list iep-basic-scroll">
      <div class="org-item" :class="{'disabled':org.orgId === userInfo.orgId}" v-for="org in orgs" :key="org.orgId" @click="handleSwitch(org)">
        <iep-div-detail class="org-name" :value="org.name"></iep-div-detail>
        <!-- <div class="org-name" :title="org.name">{{org.name}}</div> -->
        <div class="switch-icon">
          <a-icon type="swap" />
        </div>
      </div>
    </div>
    <el-popover ref="popover" placement="left" width="100" trigger="hover" v-model="popoverShow">
      <qrcode class="code" :value="mUrlText" :options="{width:120}"></qrcode>
      <el-link :underline="false" icon="el-icon-link" v-copy="copyUrlText">复制SO链接</el-link>
    </el-popover>
  </my-content>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { setOrg } from '@/api/admin/user'
import MyContent from './MyContent'
export default {
  components: {
    MyContent,
  },
  data () {
    return {
      popoverShow: false,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState({
      orgs: state => state.user.orgs,
      identity: state => state.user.identity,
    }),
    copyUrlText () {
      return `${window.location.origin}/wel/org?orgId=${this.userInfo.orgId}&type=0`
    },
    mUrlText () {
      return `${window.location.origin}/so/invitation/codeShare?redirect=so/orgDetail/${this.userInfo.orgId}`
    },
  },
  methods: {
    ...mapActions([
      'GetUserInfo',
      'GetMenu',
      'ClearMenu',
    ]),
    async handleSwitch (org) {
      if (org.orgId === this.userInfo.orgId) {
        return
      }
      this.$confirm(`是否切换为${org.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.ClearMenu()
        const loading = this.$loading({
          lock: true,
          text: 'SO切换中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        await setOrg(org.orgId)
        await this.GetUserInfo()
        await this.GetMenu()
        loading.close()
        this.$notify({
          title: 'SO切换成功！',
          message: `已切换为 ${org.name} SO`,
          type: 'success',
        })
        this.$router.push({
          path: '/',
        })
      }).catch(() => {
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.current-org {
  display: flex;
  justify-content: space-between;
}
.org-list {
  margin-top: 15px;
  font-size: 14px;
  max-height: 112px;
  overflow-x: hidden;
  .org-item {
    display: flex;
    justify-content: space-between;
    border-left: 3px solid #eee;
    padding: 3px 0;
    padding-left: 15px;
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      color: #999;
      &:hover {
        border-color: #eee;
        background-color: transparent;
        color: #999;
        .switch-icon {
          display: none;
        }
      }
    }
    &:hover {
      border-color: $--menu-color-primary;
      background-color: #eee;
      color: $--menu-color-primary;
      .switch-icon {
        display: block;
      }
    }
    .switch-icon {
      color: $--menu-color-primary;
      display: none;
      margin-right: 10px 15px;
    }
    .org-name {
      max-width: 150px;
    }
  }
}
.current-wrapper {
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px;
  font-size: 15px;
}
.current-role {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
