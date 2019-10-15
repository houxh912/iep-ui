<template>
  <a-modal title="关于" v-model="visible">
    <div class="about">
      <h3>项目名称：{{BUILD_PROJECT}}</h3>
      <p>项目团队：{{BUILD_TEAM_NAME}}</p>
      <p>前端名称：{{ BUILD_PRO_NAME }}({{ BUILD_VER_TAG }})</p>
      <p>版本号：{{ BUILD_GIT_HASH }}</p>
      <p v-html="BUILD_PRO_DESC"></p>
      <p>最近更新日期：{{ BUILD_TIME | parseToTimeSeconds }}</p>
    </div>
    <template slot="footer">
      <a-button key="submit" type="primary" @click="visible=false">
        好的
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import { parseToTimeSeconds } from '@/filters/index.js'
export default {
  data () {
    return {
      visible: false,
      // eslint-disable-next-line
      BUILD_PROJECT: BUILD_PROJECT,
      // eslint-disable-next-line
      BUILD_TEAM_NAME: BUILD_TEAM_NAME,
      // eslint-disable-next-line
      BUILD_PRO_NAME: BUILD_PRO_NAME,
      // eslint-disable-next-line
      BUILD_GIT_HASH: BUILD_GIT_HASH,
      // eslint-disable-next-line
      BUILD_VER_TAG: BUILD_VER_TAG,
      // eslint-disable-next-line
      BUILD_PRO_DESC: BUILD_PRO_DESC,
      // eslint-disable-next-line
      BUILD_TIME: BUILD_TIME,
    }
  },
  created () {
    console.log(`前端名称：${this.BUILD_PRO_NAME}(${this.BUILD_VER_TAG})`)
    console.log(`版本号：${this.BUILD_GIT_HASH}`)
    console.log(`最近更新日期：${parseToTimeSeconds(this.BUILD_TIME)}`)
  },
  methods: {
    handleClose () {
      this.visible = false
    },
  },
}
</script>
