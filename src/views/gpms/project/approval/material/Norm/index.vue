<template>
  <div>
    
    <div class="plate">
      <div class="head">
        <p class="title">材料说明</p>
        <div class="button">
          <!-- <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button> -->
          <i class="icon-bianji" style="cursor: pointer;"></i>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="(item, index) in programmeList" :key="index">
          <i class="icon-guanlian"></i>{{item.content}} <i class="close el-icon-close"></i>
        </div>
      </div>
    </div>
    <div class="plate" v-for="(item, index) in list" :key="index">
      <div class="head">
        <p class="title">{{item.name}}</p>
        <div class="button">
          <iep-button size="small" type="primary"><i class="el-icon-plus"></i> 新增</iep-button>
          <iep-button size="small"><i class="icon-guanlian"></i> 关联</iep-button>
        </div>
      </div>
      <div class="content">
        <div class="item" v-for="(t, i) in item.list" :key="i">
          <i class="icon-guanlian"></i>{{t.content}} <i class="close el-icon-close"></i>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { normyList, normyList2 } from '../const.js'
  export default {
    name: 'index',
    data (){
      return {
        programmeList: normyList,
        list: [
          { name: '项目方案', type: 'programme', list: normyList },
          { name: '最终文档成果', type: 'harvest', list: normyList2 },
          { name: '需求规格说明书', type: 'Instructions', list: normyList },
          { name: '测试文档', type: 'test', list: normyList },
          { name: '项目合同', type: 'contract', list: normyList2 },
        ],
      }
    },
    methods :{
    },

  }
</script>

<style lang="scss" scoped>
.plate {
  border: 1px solid #eee;
  padding: 20px 15px;
  margin-bottom: 20px;
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
</style>