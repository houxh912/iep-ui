<template>
  <div class="mark">
    <IepAppTabCard :title="title">
      <div class="dynamicList" v-if="list.length !== 0">
        <div v-for="(item, index) in list" :key="index" class="piece">
          <span>{{dateFormat(item.createTime)}} 被 <span class="creator" @click="handleRoute(item)">{{item.creatorName}}</span> 打赏</span>
        </div>
      </div>
      <IepNoData v-else></IepNoData>
    </IepAppTabCard>
  </div>
</template>

<script>
import { getWealthFlowListById } from '@/api/fams/wealth_flow'
import { dateFormat } from '@/util/date'

export default {
  data () {
    return {
      title: '奖惩记录',
      list: [],
      dateFormat,
    }
  },
  methods: {
    handleRoute (row) {
      this.$router.push(`/app/personal_style/${row.creatorId}`)
    },
  },
  created () {
    getWealthFlowListById(this.$route.params.id).then(({data}) => {
      this.list = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.mark {
  margin-bottom: 30px;
}
.dynamicList {
  .piece {
    position: relative;
    padding-left: 15px;
    height: 34px;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 14px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
    .creator {
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
    }
    .dn {
      opacity: 0;
    }
  }
}
</style>
