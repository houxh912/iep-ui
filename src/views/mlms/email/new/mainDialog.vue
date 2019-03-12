<template>
  <iep-dialog :dialog-show="dialogShow" title="添加关联" width="60%" @close="resetForm">

    <!-- transfer -->
    <div class="iep-transfer">
      <div class="transfer">
        <ul class="list">
          <li class="item" :class="activitIndex === index ? 'selectItem' : ''" v-for="(item, index) in transferList.firstList" :key="index" @click="firstClick(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <div class="transfer">
        <el-input class="search" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="searchVal"></el-input>
        <ul class="list">
          <li class="item" :class="selectFn(transferList.thirdList, item.id) ? 'selectItem' : ''" v-for="(item, index) in transferList.secondList" :key="index" @click="secondClick(item)">{{item.name}}</li>
        </ul>
      </div>
      <div class="arrow"><i class="el-icon-d-arrow-right"></i></div>
      <div class="transfer">
        <ul class="list">
          <li class="item last-item" v-for="(item, index) in transferList.thirdList" :key="index">{{item.name}}<i class="el-icon-close" @click="cancel(index)"></i></li>
        </ul>
      </div>
    </div>

    <template slot="footer">
      <iep-button type="danger" @click="submitForm('form')">添加</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import IepDialog from '@/components/IepDialog/'
export default {
  components: { IepDialog },
  data () {
    return {
      dialogShow: false,
      transferList: {
        firstList: [],
        secondList: [],
        thirdList: [],
      },
      activitIndex: -1,
      searchVal: '',
    }
  },
  methods: {
    loadData () {
      this.transferList = {
        firstList: [
          { id: 1, name: '报表' },
          { id: 2, name: '项目' },
          { id: 3, name: '材料' },
          { id: 4, name: '日程' },
          { id: 5, name: '可关联的事项分类' },
        ],
        secondList: [
          { id: 1, name: '报表名字1号' },
          { id: 2, name: '报表名字2号' },
          { id: 3, name: '报表名字3号' },
        ],
        thirdList: [
          { id: 1, name: '报表名字1号' },
          { id: 3, name: '报表名字3号' },
        ],
      }
    },
    submitForm () {},
    resetForm () {
      this.transferList = {
        firstList: [],
        secondList: [],
        thirdList: [],
      }
      this.dialogShow = false
    },
    firstClick (item) {
      console.log('item: ', item)
    },
    secondClick (item) {
      if (this.selectFn(this.transferList.thirdList, item.id)) {
        return
      }
      this.transferList.thirdList.push(item)
    },
    selectFn (list, id) {
      for(let item of list) {
        if (item.id === id) {
          return true
        }
      }
      return false
    },
    cancel (index) {
      this.transferList.thirdList.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.iep-transfer {
  display: flex;
  .transfer {
    flex: 1;
    overflow-y: scroll;
    height: 300px;
    border: 1px solid #ddd;
    padding: 15px 20px;
    .list {
      .item {
        height: 30px;
        cursor: pointer;
      }
      .selectItem {
        color: #409EFF;
        cursor: not-allowed;
      }
      .last-item {
        cursor: text;
        position: relative;
        i {
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
