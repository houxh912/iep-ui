<template>
  <div class="more">
    <IepAppTabsCard>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='userInfo'" v-slot:userInfo>
          <userInfo v-loading="activeTab !=='userInfo'"></userInfo>
        </template>
        <template v-if="activeTab ==='workExperience'" v-slot:workExperience>
          <workExperience v-loading="activeTab !=='workExperience'"></workExperience>
        </template>
        <template v-if="activeTab ==='educationalExperience'" v-slot:educationalExperience>
          <educationalExperience v-loading="activeTab !=='educationalExperience'"></educationalExperience>
        </template>
        <template v-if="activeTab ==='externalCertificate'" v-slot:externalCertificate>
          <externalCertificate v-loading="activeTab !=='externalCertificate'"></externalCertificate>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import userInfo from './userInfo'
import workExperience from './workExperience'
import educationalExperience from './educationalExperience'
import externalCertificate from './externalCertificate'

export default {
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
    border: 0;
    .iep-tabs {
      width: 100%;
    }
  }
}
</style>


