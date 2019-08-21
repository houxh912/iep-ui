<template>
  <div class="project">
    <IepAppTabsCard>
      <el-button class="publish" slot="left" type="text" @click="activeTab ==='thoughts'?publishThoughts():publishSuggest()">我要发表</el-button>
      <iep-tabs v-model="activeTab" :tab-list="tabList">
        <template v-if="activeTab ==='thoughts'" v-slot:thoughts>
          <thoughts v-loading="activeTab !=='thoughts'"></thoughts>
        </template>
        <template v-if="activeTab ==='suggest'" v-slot:suggest>
          <suggest v-loading="activeTab !=='suggest'"></suggest>
        </template>
      </iep-tabs>
    </IepAppTabsCard>
  </div>
</template>
<script>
import Thoughts from './Thoughts'
import Suggest from './Suggest'
export default {
  components: {
    Thoughts,
    Suggest,
  },
  data () {
    return {
      tabList: [{
        label: '产品说说',
        value: 'thoughts',
      }, {
        label: '有奖建议',
        value: 'suggest',
      }],
      activeTab: 'thoughts',
    }
  },
  methods: {
    publishThoughts () {
      this.$router.push('/app/subject_list?title=产品&id=40')
    },
    publishSuggest () {
      this.$router.push('/hrms_spa/suggestion_new')
    },
  },
}
</script>
<style lang="scss" scoped>
.publish {
  position: absolute;
  top: 4px;
  right: 10px;
  line-height: 50px;
  padding: 0;
  color: #cb3737;
  z-index: 3;
  transition: all 0.5s;
  &:hover {
    opacity: 0.7;
  }
}
</style>

<style lang="css" scoped>
.project >>> .el-card__body {
  height: 306px;
}
</style>
