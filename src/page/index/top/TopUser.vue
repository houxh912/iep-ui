<template>
  <div>
    <a-dropdown>
      <div class="user-info-wrapper">
        <a-avatar :src="userInfo.avatar" />
        <span class="user-name">{{ userInfo.realName || '游客' }}</span>
        <a-icon type="down" />
      </div>
      <a-menu slot="overlay">
        <a-menu-item @click="$openPage('/')">
          工作台
        </a-menu-item>
        <a-menu-item @click="handleOrg(orgText.type)">
          {{orgText.tipText}}&nbsp;&nbsp;&nbsp;
          <a-icon type="swap" />
        </a-menu-item>
        <a-menu-item @click="$openPage('BaseSettings','name')">
          个人信息
        </a-menu-item>
        <a-menu-item @click="handleAbout">
          关于
        </a-menu-item>
        <a-menu-item @click="logout">
          退出系统
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <select-org-dialog ref="selectOrgDialog"></select-org-dialog>
    <about-dialog ref="AboutDialog"></about-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AboutDialog from './AboutDialog'
import SelectOrgDialog from './SelectOrgDialog'
export default {
  components: {
    SelectOrgDialog,
    AboutDialog,
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'noOrg',
    ]),
    orgText () {
      return this.noOrg ? {
        tipText: '无组织(加入/创建)',
        type: 0,
      } : {
          tipText: `${this.userInfo.orgName}`,
          type: 1,
        }
    },
  },
  methods: {
    handleOrg (type) {
      if (type === 0) {
        this.$router.push({ name: '选择组织' })
      } else {
        this.$refs['selectOrgDialog'].dialogShow = true
      }
    },
    handleAbout () {
      this.$refs['AboutDialog'].dialogShow = true
    },
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/login' })
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.user-info-wrapper {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-name {
    margin-left: 10px;
  }
}
</style>
