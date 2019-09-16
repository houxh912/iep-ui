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
    <div class="org-list">
      <div class="org-item" v-for="org in orgs" :key="org.orgId" @click="handleSwitch(org)">
        <div class="org-name">{{org.name}}</div>
        <div class="switch-icon">
          <a-icon type="swap" />
        </div>
      </div>
    </div>
  </my-content>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { setOrg } from '@/api/admin/user'
import MyContent from './MyContent'
export default {
  components: { MyContent },
  computed: {
    ...mapGetters(['userInfo']),
    ...mapState({
      orgs: state => state.user.orgs,
    }),
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
  height: 100px;
  overflow-y: scroll;
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
