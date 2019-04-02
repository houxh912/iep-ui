<template>
  <div class="set-containter">
    <basic-container>
      <div class="main-top">
        <el-card class="left" shadow="hover">
          <h4 class="title">财务资产</h4>
          <ul>
            <li>
              <span class="num">6233.5</span>
              <span class="sub-title">库存现金</span>
            </li>
            <li>
              <span class="num">8000</span>
              <span class="sub-title">银行存款</span>
            </li>
            <li>
              <span class="num">2000</span>
              <span class="sub-title">集团往来</span>
            </li>
            <li>
              <span class="num">3000</span>
              <span class="sub-title">合同应收账款</span>
            </li>
            <li>
              <span class="num">6233.5</span>
              <span class="sub-title">投资</span>
            </li>
            <li>
              <span class="num">8000</span>
              <span class="sub-title">融资</span>
            </li>
            <li>
              <span class="num">3000</span>
              <span class="sub-title">其他应收款</span>
            </li>
            <li>
              <span class="num">6233.5</span>
              <span class="sub-title">内部借款</span>
            </li>
          </ul>
        </el-card>
        <el-card class="right" shadow="hover">
          <h4 class="title">快捷入口</h4>
          <ul>
            <li>新建收入</li>
            <li>新建支出</li>
            <li>工资导入</li>
            <li>部门转账</li>
            <li>新增预算</li>
            <li>打赏/扣减</li>
          </ul>
        </el-card>
      </div>

      <el-card class="conent" shadow="hover">
        <page-header title="财务流水"></page-header>
        <operation-container>
          <template slot="left">
            <page-header class="data-title" :replaceText="replaceText" :data="[10 ,0, 1,300000,0,0]"></page-header>
          </template>
          <template slot="right">
            <operation-search @search="searchPage" advance-search>
              <el-form :model="paramForm" label-width="100px" size="mini">
                <el-form-item label="线下公司：">
                  <el-input v-model="paramForm.company"></el-input>
                </el-form-item>
                <el-form-item label="银行户头：">
                  <el-input v-model="paramForm.account"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="searchPage">搜索</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </operation-search>
          </template>
        </operation-container>
        <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :columnsMap="columnsMap" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="handleSelectionChange" is-mutiple-selection>
          <template slot="before-columns">
            <el-table-column label="时间">
              <template slot-scope="scope">
                <iep-table-link @click="handleDetail(scope.row)">{{scope.row.name}}</iep-table-link>
              </template>
            </el-table-column>
          </template>
        </iep-table>
      </el-card>
    </basic-container>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap, initSearchForm } from '../options'
export default {
  mixins: [mixins],
  data () {
    return {
      columnsMap,
      paramForm: initSearchForm(),
      value: '',
      replaceText: (data) => `支出：${data[0]}笔，支出金额：￥${data[1]}元，收入${data[2]}笔，收入金额￥${data[3]}元，抵扣：${data[4]}笔，抵扣金额${data[5]}元`,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val.map(m => m.id)
    },
    handleDetail (row) {
      this.$emit('onDetail', row)
    },
    // handleRejected (row) {
    //   console.log(row)
    //   this.$refs['RejectedDialog'].dialogShow = true
    // },
    loadPage (param = this.paramForm) {
      this.loadTable(param, getTalentPoolPage)
    },
  },
}
</script>
<style lang="scss" scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.main-top,
ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.main-top {
  align-items: stretch;
  .title {
    margin: 0;
    font-size: 20px;
  }
  .left {
    flex: 1;
    margin-right: 20px;
    li {
      margin-bottom: 10px;
      padding: 12px 0;
      min-width: 230px;
      text-align: center;
      border-right: 1px solid #ebeef5;
      &:nth-child(4) {
        border: 0;
      }
      &:last-child {
        border: 0;
      }
    }
  }
  .right {
    flex: 0 0 300px;
    align-items: stretch;
    ul {
      display: flex;
      margin-top: 10px;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        cursor: pointer;
        padding: 15px 0;
        width: 120px;
        text-align: center;
        cursor: pointer;
        &:hover {
          color: #cb3737;
        }
      }
    }
  }
  ul {
    span {
      display: block;
      text-align: center;
    }
    .num {
      font-size: 24px;
    }
    .sub-title {
      color: #999;
    }
  }
}
.conent {
  margin-top: 20px;
}
</style>
<style lang="css" scoped>
.set-containter >>> .el-dialog {
  width: 40%;
}
.set-containter >>> .el-dialog__footer {
  text-align: center;
}
.set-containter >>> .el-dialog__header .el-dialog__title {
  font-size: 16px;
}
.set-containter >>> .el-dialog__header {
  border-bottom: 1px solid #ebeef5;
}
.set-containter >>> .title-col {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}
.set-containter >>> .data-title {
  margin-bottom: 0;
}
.set-containter >>> .data-title .page-title {
  display: none;
}
.set-containter >>> .data-title .title-col {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.set-containter >>> .operation-container {
  margin-top: 20px;
}
</style>
