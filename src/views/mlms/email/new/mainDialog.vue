<template>
  <iep-dialog :dialog-show="dialogShow" title="添加关联" width="60%" @close="resetForm">

    <!-- transfer -->
    <div class="iep-transfer">
      <div class="transfer box-list">
        <ul class="list">
          <li class="item" :class="activitIndex === index ? 'selectItem' : ''" v-for="(item, index) in firstList" :key="index" @click="firstClick(item, index)">{{item.name}}</li>
        </ul>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <div class="transfer box-list">
        <el-input class="search" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="searchVal"></el-input>
        <ul class="list">
          <li class="item" :class="selectFn(item.id) ? 'selectItem' : ''" v-for="(item, index) in secondList" :key="index" @click="secondClick(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <div class="transfer box-list">
        <ul class="list">
          <li class="item last-item" v-for="(item, index) in transferList.materialIds" :key="index">
            <p>{{item.name}}</p>
            <i class="el-icon-close" @click="cancel(index, 'materialIds')"></i>
          </li>
        </ul>
      </div>
    </div>

    <template slot="footer">
      <iep-button type="primary" @click="submitForm('form')">添加</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
import { getReceiverList } from '@/api/mlms/email/material'

export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      firstList: [
        { id: 1, name: '报表', requestFn: '' },
        { id: 2, name: '项目', requestFn: '' },
        { id: 3, name: '材料', requestFn: getReceiverList, type: 'materialIds' },
        { id: 4, name: '日程', requestFn: '' },
        { id: 5, name: '可关联的事项分类', requestFn: '' },
      ],
      secondList: [],
      thirdList: [],
      transferList: {
        projectIds: [], // 项目
        summaryIds: [], // 纪要
        materialIds: [], // 材料
        reportIds: [], // 报表
      },
      activitIndex: -1, // 目前关联的类型
      searchVal: '',
      params: {
        current: 1,
        size: 10,
        name: '',
      },
    }
  },
  methods: {
    loadData () {},
    submitForm () {
      console.log('transferList: ', this.transferList)
      this.dialogShow = false
      this.$emit('relativeSubmit', this.transferList)
    },
    // 重置穿梭框
    resetForm () {
      this.secondList = [],
      this.thirdList = [],
      this.dialogShow = false
    },
    firstClick (item, index) {
      this.params = {
        current: 1,
        size: 10,
        name: '',
      }
      if (!item.type) {
        this.$message.error('对不起，这块功能还未实现！')
        return
      }
      this.activitIndex = index
      item.requestFn(this.params).then(({data}) => {
        console.log('data: ', data)
        this.secondList = data.data.records
      })
    },
    secondClick (item) {
      if (this.selectFn(this.thirdList, item.id)) {
        return
      }
      // 判断是由什么类型关联选中的，然后放到对应的数组中
      this.transferList[this.firstList[this.activitIndex].type].push(item)
    },
    // 判断是否已经选中
    selectFn (id) {
      for(let item of this.transferList[this.firstList[this.activitIndex].type]) {
        if (item.id === id) {
          return true
        }
      }
      return false
    },
    // 删除第三个框选中的数据
    cancel (index, type) {
      this.transferList[type].splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.iep-transfer {
  display: flex;
  .box-list::-webkit-scrollbar {
    border-radius: 10px;
    width: 6px;
    background-color: #fff;
  }
  .box-list::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
  }
  .box-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ddd;
    -webkit-transition: 0.3s background-color;
    transition: 0.3s background-color;
    display: none;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
  .box-list:hover ::-webkit-scrollbar-thumb {
    display: block;
  }
  .transfer {
    flex: 1;
    overflow-y: scroll;
    height: 300px;
    border: 1px solid #ddd;
    padding: 15px 20px;
    .list {
      .item {
        list-style: none;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .selectItem {
        color: #409EFF;
        cursor: not-allowed;
      }
      .last-item {
        cursor: text;
        position: relative;
        display: flex;
        p {
          width: calc(100% - 20px);
          margin: 0;
        }
        i {
          width: 20px;
          text-align: right;
          cursor: pointer;
          position: absolute;
          right: 10px;
          line-height: 30px;
        }
      }
    }
    .search {
      margin-bottom: 20px;
    }
  }
  .arrow {
    width: 60px;
    text-align: center;
    line-height: 300px;
    font-size: 20px;
  }
}
</style>
