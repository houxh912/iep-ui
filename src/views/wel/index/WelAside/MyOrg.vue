<template>
  <my-content class="my-content" title-name="所属组织">
    <template v-slot:stitle>
      <div class="sub-title" @click="handleCreate">
        创建组织
      </div>
    </template>
    <div class="current-org">
      <span class="current-label">当前</span>
      <span class="current-name">{{userInfo.orgName}}</span>
    </div>
    <div class="current-role">
      <div>
        <span>组织角色：</span>
        <span>{{identity}}</span>
      </div>
      <iep-button type="primary" v-popover:popover plain>组织邀请</iep-button>
    </div>
    <div class="org-list">
      <div class="org-item" v-for="org in orgs" :key="org.orgId" @click="handleSwitch(org)">
        <div class="org-name">{{org.name}}</div>
        <div class="switch-icon">
          <a-icon type="swap" />
        </div>
      </div>
    </div>
    <el-popover ref="popover" placement="left" width="100" trigger="hover" v-model="popoverShow">
      <el-link :underline="false" icon="el-icon-link" v-copy="copyUrlText">复制组织链接</el-link>
    </el-popover>
  </my-content>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { setOrg } from '@/api/admin/user'
import MyContent from './MyContent'
export default {
  components: { MyContent },
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
  },
  methods: {
    ...mapActions([
      'GetUserInfo',
      'GetMenu',
      'ClearMenu',
    ]),
    handleCreate () {
      this.$openPage('/wel/org?type=1')
    },
    async handleSwitch (org) {
      this.$confirm(`是否切换为${org.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await this.ClearMenu()
        const loading = this.$loading({
          lock: true,
          text: '组织切换中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        })
        await setOrg(org.orgId)
        await this.GetUserInfo()
        await this.GetMenu()
        loading.close()
        this.$message({
          message: '组织切换成功！',
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
.org-list {
  margin-top: 15px;
  font-size: 15px;
  max-height: 112px;
  overflow-x: hidden;
  .org-item {
    display: flex;
    justify-content: space-between;
    border-left: 3px solid #eee;
    padding: 3px 0;
    padding-left: 15px;
    cursor: pointer;
    &:hover {
      border-color: $--menu-color-primary;
      background-color: #eee;
      .switch-icon {
        display: block;
      }
    }
    .switch-icon {
      display: none;
      margin-right: 10px;
    }
    .org-name {
      max-width: 150px;
    }
  }
}
.current-role {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.current-label {
  border: 1px solid;
  color: #aaa;
  padding: 1px 4px;
}
.current-name {
  font-size: 15px;
  margin-left: 5px;
}
.sub-title {
  font-size: 12px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #cb132d;
  }
}
</style>
<style scoped>
.org-list::-webkit-scrollbar {
  border-radius: 10px;
  width: 6px;
  /* background-color: #fff; */
}
.org-list::-webkit-scrollbar-track {
  border-radius: 10px;
  /* background-color: #fff; */
  transition: 0.3s background-color;
}
.org-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ddd;
  transition: 0.3s background-color;
  display: none;
  transition: all 0.5s;
}
.org-list:hover::-webkit-scrollbar-thumb {
  display: block;
}
</style>