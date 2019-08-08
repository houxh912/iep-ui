<template>
  <div class="notice">
    <IepAppTabCard :title="title" :linkName="linkName" isMore>
      <div v-if="dataList.length !== 0">
        <IepAppAssortCard :dataList="dataList" class="notice-box" title="typeName" desc="name" @click="handleDetail">
          <!-- <span class="new" slot="label">NEW</span> -->
        </IepAppAssortCard>
      </div>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getNotificationList } from '@/api/app/ims/'

export default {
  data () {
    return {
      title: '通知公告',
      dataList: [],
      linkName: '/wel/message/announcement',
    }
  },
  methods: {
    handleDetail (row) {
      this.$router.push(`/ims_spa/announcement_detail/${row.id}`)
    },
  },
  created () {
    getNotificationList().then(({ data }) => {
      for (let item of data.data) {
        item.typeName = `【${item.typeName}】`
      }
      this.dataList = data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.notice-box {
  position: relative;
  .piece {
    position: relative;
  }
  .new {
    position: absolute;
    right: 0;
    top: 10px;
    padding: 0 3px;
    height: 18px;
    line-height: 14px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #cb3737;
    color: #cb3737;
    box-shadow: 1px 1px 1px 1px #eee;
  }
}
</style>
<style scoped>
.notice >>> .el-card {
  height: 366px;
}
.notice >>> .assort .piece {
  margin-left: -8px;
  padding: 0;
  height: 38px;
  line-height: 38px;
}
</style>
