<template>
  <div class="organizational-dynamics-con">
    <div class="organizational-dynamics" v-if="organizationalDynamics.length !== 0">
      <div v-for="(item,index) in organizationalDynamics" :key="index" class="piece" @click="handleDetail(item)">
        <span class="name">{{item.title}}</span>
        <!-- <span class="time">{{item.time}}</span> -->
      </div>
    </div>
    <IepNoData v-else></IepNoData>
  </div>
</template>

<script>
// import { getNewsList } from '@/api/app/mlms/'
import { getOrgEventsByOrgId } from '@/api/admin/orgEvents'

export default {
  props: {
    orgId: {
      default: 0,
    },
  },
  data () {
    return {
      data: '（10条）',
      organizationalDynamics: [],
    }
  },
  methods: {
    getNewsList (id) {
      // getNewsList({ orgId: id }).then(({ data }) => {
      //   this.organizationalDynamics = data.data
      // })
      getOrgEventsByOrgId(id).then(({data}) => {
        this.organizationalDynamics = data.data.slice(0, 6)
      })
    },
    handleDetail () {
      // this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  watch: {
    orgId (newVal) {
      this.getNewsList(newVal)
    },
  },
}
</script>
<style lang="scss" scoped>
.organizational-dynamics {
  .piece {
    cursor: pointer;
    position: relative;
    .name {
      display: inline-block;
      width: 250px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      float: right;
      height: 30px;
      line-height: 30px;
      color: #999;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
  }
}
</style>
<style scoped>
.organizational-dynamics-con >>> .el-card {
  height: 275px;
}
</style>
