<template>
  <div class="more">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='userInfo'" v-slot:userInfo>
          <userInfo v-loading="activeTab !=='userInfo'" :userInfo="userInfo"></userInfo>
        </template>
        <template v-if="activeTab ==='workExperience'" v-slot:workExperience>
          <workExperience v-loading="activeTab !=='workExperience'" :list="userInfo.workExperience"></workExperience>
        </template>
        <template v-if="activeTab ==='educationalExperience'" v-slot:educationalExperience>
          <educationalExperience v-loading="activeTab !=='educationalExperience'" :list="userInfo.eduSituation"></educationalExperience>
        </template>
        <template v-if="activeTab ==='externalCertificate'" v-slot:externalCertificate>
          <externalCertificate v-loading="activeTab !=='externalCertificate'" :list="userInfo.userCert"></externalCertificate>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
    <!-- <div class="footer" @click="handleClose">收起 <i class="el-icon-arrow-up"></i></div> -->
  </div>
</template>
<script>
import userInfo from './userInfo'
import workExperience from './workExperience'
import educationalExperience from './educationalExperience'
import externalCertificate from './externalCertificate'

export default {
  props: {
    userInfo: {
      type: Object,
    },
  },
  components: {
    userInfo, workExperience, educationalExperience, externalCertificate,
  },
  computed: {
    tabList () {
      return [{
        label: '基本信息',
        value: 'userInfo',
      }, {
        label: '工作经历',
        value: 'workExperience',
      }, {
        label: '教育经历',
        value: 'educationalExperience',
      }, {
        label: '外部证书',
        value: 'externalCertificate',
      }]
    },
  },
  data () {
    return {
      activeTab: 'userInfo',
      linkName: '',
    }
  },
  methods: {
    handleClose () {
      this.$emit('handleClose', true)
    },
  },
  created () {

  },
}
</script>
<style lang="scss" scoped>
.more {
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  .el-card {
    padding: 0;
    border: 0;
    .iep-tabs {
      width: 100%;
    }
  }
  .footer {
    text-align: center;
    cursor: pointer;
  }
}
</style>
