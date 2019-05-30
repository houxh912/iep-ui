<template>
  <div class="training-con">
    <iepAppTabCard :title="title" :linkName="linkName" :data="data" isMore>
      <div class="training-notice">
        <div v-for="(item,index) in documentList.slice(0, 12)" :key="index" class="piece">
          <span class="name" @click="handleDetail(item)">{{item.material_name}}</span>
        </div>
      </div>
    </iepAppTabCard>
  </div>
</template>

<script>
import { getMaterialList } from '@/api/app/mlms/'

export default {
  data () {
    return {
      title: '制度文件',
      data: '',
      documentList: [],
      linkName: '/app/resource/material',
    }
  },
  methods: {
    loadList () {
      getMaterialList().then(({data}) => {
        this.documentList = data.data.gzzd ? data.data.gzzd : []
      })
    },
    handleDetail (row) {
      this.$router.push(`/app/resource/material/material_detail/${row.id}`)
    },
  },
  created () {
    this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.training-notice {
  .piece {
    cursor: pointer;
    position: relative;
    margin-left: 15px;
    height: 30px;
    .name {
      display: inline-block;
      width: 100%;
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
      color: #666;
    }
    &:hover {
      color: #cb3737;
      &:before {
        background-color: #cb3737;
      }
    }
    &:before {
      content: "";
      position: absolute;
      left: -15px;
      top: 12px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #999;
    }
  }
}
</style>
<style scoped>
.training-con >>> .el-card__body {
  height: 378px;
}
</style>
