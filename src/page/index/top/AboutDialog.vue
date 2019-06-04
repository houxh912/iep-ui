<template>
  <a-modal title="关于" v-model="visible">
    <div class="about">
      <h3>项目名称：{{BUILD_PROJECT}}</h3>
      <p>项目团队：{{BUILD_TEAM_NAME}}</p>
      <p>前端名称：{{ BUILD_PRO_NAME }}({{ BUILD_VER_TAG }})</p>
      <p>版本号：{{ BUILD_GIT_HASH }}</p>
      <p v-html="BUILD_PRO_DESC"></p>
      <p>最近更新日期：{{ BUILD_TIME | parseTime }}</p>
      <p>是否开启实验性功能：
        <a-switch :checked="isExperimental" checkedChildren="开" unCheckedChildren="关" @change="setExperimental" />
      </p>
      <p>实验性功能：
        1. 即时聊天功能!
      </p>
    </div>
    <template slot="footer">
      <a-button key="submit" type="primary" @click="visible=false">
        好的
      </a-button>
    </template>
  </a-modal>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
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
  computed: {
    ...mapState({
      isExperimental: state => state.common.isExperimental,
    }),
  },
  methods: {
    ...mapMutations({
      setExperimental: 'SET_EXPERIMENTAL',
    }),
    handleClose () {
      this.visible = false
    },
  },
}
</script>
