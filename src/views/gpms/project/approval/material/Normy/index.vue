<template>
  <div>
    
    <div class="plate">
      <div class="head">
        <p class="title">会议纪要</p>
        <div class="button">
          <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in summaryList" :key="index">
          <i class="icon-guanlian"></i>{{item.content}} <i class="close el-icon-close"></i>
        </div>
      </div>
    </div>
    <div class="plate">
      <div class="head">
        <p class="title">项目周报</p>
        <div class="button">
          <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in summaryList" :key="index">
          <i class="icon-guanlian"></i>{{item.content}} <i class="close el-icon-close"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { normyList, normyList2 } from '../const.js'
import { getMeetingList } from '@/api/gpms/material'

export default {
  name: 'index',
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
  },
  data (){
    return {
      summaryList: normyList,
      list2: normyList2,
    }
  },
  methods: {
  },
  created () {
    getMeetingList({
      projectId: this.projectId,
      materialType: 2,
    }).then(({data}) => {
      console.log('data: ', data)
    })
  },
}
</script>

<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  .head {
    display: flex;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    .title {
      font-size: 18px;
      margin: 0;
    }
    .button {
      padding-bottom: 10px;
      .el-button {
        margin-right: 10px;
      }
      i {
        font-size: 16px !important;
      }
    }
  }
  .content {
    padding: 15px 0;
    .item {
      margin-bottom: 15px;
      i {
        margin-right: 10px;
      }
      .close {
        cursor: pointer;
      }
    }
  }
}
.plate:first-of-type {
  margin-bottom: 20px;
}
</style>