<template>
<div class=" iep-basic-scroll">
    <iep-dialog :dialog-show="dialogShow" title="添加关联" width="800px" @close="resetForm">
    <div class="iep-transfer">
      <div class="head">
        <div class="title">选择事项分类：</div>
        <div class="radio">
          <li v-for="(item, index) in selectList" :key="index" :class="activeIndex == index ? 'active' : ''" @click="chosenIndex(item, index)">{{item.name}}</li>
        </div>
      </div>
      <div class="content">
        <div class="search">
          <el-input placeholder="请输入关键字" v-model="name" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
          </el-input>
        </div>
        <div class="list">
          <iep-scroll :load="projectState" @load-page="loadProject">
            <el-checkbox-group v-model="formData">
              <div class="item" v-for="(item, index) in relationlist" :key="index">
                <el-checkbox :label="item.id" name="type" @change="changeItem(item)">{{item.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </iep-scroll>
        </div>
      </div>
    </div>
    <template slot="footer">
      <iep-button type="primary" @click="submitForm">添加</iep-button>
      <iep-button @click="resetForm">取消</iep-button>
    </template>
  </iep-dialog>
</div>
</template>
<script>
import IepScroll from '@/components/IepScroll/index'
import { getMaterialList } from '@/api/mlms/material/datum/material'
import { getTableData } from '@/api/mlms/material/summary'
// import { getContractPageAll } from '@/api/mlms/material/datum/contract'
// import { getProjectList } from '@/api/gpms/index'
// import { getAllReportsOrg } from '@/api/mlms/material/report/project'
function initParams () {
  return {
    current: 1,
    size: 10,
    name: '',
  }
}

export default {
  components: { IepScroll },
  data () {
    return {
      dialogShow: false,
      activeIndex: 0,
      projectState: 0,
      selectList: [
        { name: '会议纪要', requestFn: getTableData, type: 'summaryList', prop: 'title', searchName: 'title' },
        { name: '材料', requestFn: getMaterialList, type: 'materialList', searchName: 'name' },
        // { name: '合同', requestFn: getContractPageAll, type: 'contractList', prop: 'contractName', searchName: 'contractName' },
        // { name: '项目', requestFn: getProjectList, type: 'projectList', prop: 'projectName', searchName: 'projectName' },
        // { name: '周报', requestFn: getAllReportsOrg, type: 'reportList', prop: 'projectName', id: 'projectWeekReportId', searchName: 'projectName' },
      ],
      transferList: {
        summaryList: [], // 纪要
        materialList: [], // 材料
        contractList: [], // 合同
        projectList: [], // 项目
        reportList: [], // 周报
      },
      name: '',
      relationlist: [],
      params: initParams(),
      formData: [],
    }
  },
  methods: {
    loadData (list) {
      this.transferList = list
      this.chosenIndex(this.selectList[0], 0)
    },
    resetForm () {
      this.dialogShow = false
    },
    chosenIndex (row, index) {
      if (!row.type) {
        this.$message.info('抱歉，这块功能还未实现！')
        return
      }
      // 获取到现在的选中
      this.formData = []
      for (let item of this.transferList[this.selectList[index].type]) {
        this.formData.push(item.id)
      }
      // 开始获取数据
      this.relationlist = []
      this.params = initParams()
      this.activeIndex = index
      this.getListFn()
    },
    searchData () {
      this.relationlist = []
      this.projectState = 4
      this.params.current = 1
      this.params[this.selectList[this.activeIndex].searchName] = this.name
      this.getListFn()
    },
    getListFn () {
      let row = this.selectList[this.activeIndex]
      row.requestFn(this.params).then(({data}) => {
        if (data.data.records.length > 0) {
          this.projectState = 0
          if (row.prop) {
            for (let t of data.data.records) {
              t.name = t[row.prop]
              if (row.id) {
                t.id = t[row.id]
              }
            }
          }
          this.relationlist = this.relationlist.concat(data.data.records)
        } else {
          this.projectState = 7
        }
      })
    },
    submitForm () {
      this.dialogShow = false
      this.$emit('relativeSubmit', this.transferList)
    },
    // 加载更多
    loadProject () {
      this.projectState = 4
      ++this.params.current
      this.getListFn()
    },
    changeItem (val) {
      // 首先判断是新增还是删除 - 循环到了即存在，要去除，循环不到即不存在，添加
      let list = this.transferList[this.selectList[this.activeIndex].type]
      for (let i in list) {
        if (list[i].id == val.id) {
          this.transferList[this.selectList[this.activeIndex].type].splice(i, 1)
          return
        }
      }
      this.transferList[this.selectList[this.activeIndex].type].push({id: val.id, name: val.name})
    },
  },
}
</script>
<style lang="scss" scoped>
.iep-transfer {
  margin-bottom: 20px;
  .head {
    display: flex;
    margin-bottom: 20px;
    .title {
      width: 100px;
    }
    .radio {
      flex: 1;
      display: flex;
      li {
        list-style: none;
        width: calc(100% / 6);
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        text-align: center;
        margin-right: 20px;
      }
      .active {
        border: 1px solid #eabbbc;
        border-radius: 10px;
        background-color: #f8e8e9;
        color: #e27277;
        outline: none;
      }
    }
  }
  .content {
    height: 350px;
    border: 1px solid #ddd;
    padding: 15px 20px;
    .search {
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
    }
    .list {
      overflow: scroll;
      height: 270px;
      .item {
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>

