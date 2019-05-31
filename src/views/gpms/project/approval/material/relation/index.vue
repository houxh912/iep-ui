<template>
  <div>
    <div class="plate" v-for="(item, index) in relationList" :key="index">
      <div class="head">
        <p class="title">{{item.name}}</p>
      </div>
      <div class="content">
        <div v-if="form[item.prop].length == 0" style="color: #999;">暂无数据</div>
        <div v-else>
          <div class="item" v-for="(t, i) in form[item.prop]" :key="i">
            <i class="icon-guanlian"></i>{{t.name}}
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'index',
  props: {
    projectId: {
      type: Number,
      default: 0,
    },
    form: {
      type: Object,
    },
  },
  data (){
    return {
      relationList: [
        {
          name: '关联产品',
          prop: 'productList',
        }, {
          name: '会议纪要',
          prop: 'productList',
        }, {
          name: '关联材料',
          prop: 'materialList',
        }, {
          name: '关联合同',
          prop: 'contractList',
        }, {
          name: '其他项目',
          prop: 'projectList',
        }, {
          name: '项目周报',
          prop: 'reportList',
        },
      ],
    }
  },
  methods: {

  },
  created () {

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