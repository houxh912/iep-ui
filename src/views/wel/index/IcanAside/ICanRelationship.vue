<template>
  <i-can-content class="my-content" title-name="我的关系">
    <template v-slot:stitle>
      <iep-button size="mini" @click="$openPage('/wel/relationship_manage')">通讯录</iep-button>
    </template>
    <div class="my-wrapper">
      <div class="title-con">
        <div class="title">我的师父：</div>
        <div class="time">
          <span v-if="!relationList[0].length">暂无</span>
          <span v-for="user in relationList[0]" :key="user.id" @click="$openPage(`${ican_host}master/${user.id}.html`,'bind')">{{user.name}}</span>
        </div>
      </div>
      <div class="title-con">
        <div class="title">我的徒弟：</div>
        <div class="time">
          <span v-if="!relationList[1].length">暂无</span>
          <span v-for="user in relationList[1]" :key="user.id" @click="$openPage(`${ican_host}master/${user.id}.html`,'bind')">{{user.name}}</span>
        </div>
      </div>
      <div class="title-con">
        <div class="title">我的关注：</div>
        <div class="time">
          <span v-if="!relationList[2].length">暂无</span>
          <span v-for="user in relationList[2]" :key="user.id" @click="$openPage(`${ican_host}master/${user.id}.html`,'bind')">{{user.name}}</span>
        </div>
      </div>
      <slot></slot>
    </div>
  </i-can-content>
</template>
<script>
import website from '@/const/website'
import { getUserRelationList } from '@/api/wel/et'
import ICanContent from './ICanContent'
export default {
  components: { ICanContent },
  data () {
    return {
      ican_host: website.ican_host,
      relationList: [
        [],
        [],
        [],
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    async loadPage () {
      const { data } = await getUserRelationList()
      this.relationList = data.data
    },
  },
}
</script>
<style lang="scss" scoped>
.title-con {
  margin-bottom: 10px;
  &:nth-child(1) {
    margin-top: 15px;
  }
}
.stitle {
  font-size: 14px;
  color: $--color-primary;
  cursor: pointer;
}
.title {
  font-size: 14px;
  color: #666;
  margin: 0 4px;
  line-height: 22px;
  margin-bottom: 5px;
}
.time {
  margin-left: 5px;
  font-size: 14px;
  color: #999;
  > span {
    cursor: pointer;
    &:hover {
      color: #666;
    }
    &:not(:last-child):after {
      content: "/";
    }
  }
}
.iconfont {
  margin-left: 5px;
  color: #999;
  cursor: pointer;
}
.index-card ::v-deep .el-card__header {
  padding: 18px 0 18px;
}
.index-card ::v-deep .el-card__body {
  padding: 15px 0;
}
.el-card {
  padding: 0 15px !important;
}
</style>
