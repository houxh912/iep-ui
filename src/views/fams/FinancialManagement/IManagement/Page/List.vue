<template>
  <div class="set-containter">
    <basic-container>
      <page-header title="收入管理" class="data-title" :replaceText="replaceText" :data="[10 ,0, 1,300000,0,0]"></page-header>
      <operation-container>
        <template slot="left">
          <iep-button @click="handleIncome()" type="danger" icon="el-icon-plus" plain>新建收入</iep-button>
          <iep-button @click="handlePay()" icon="el-icon-minus" plain>新建支出</iep-button>
        </template>
        <template slot="right">
          <operation-search @search-page="searchPage">
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
    </basic-container>
    <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form>
    <dialog-form-in ref="dialogFormIn" @load-page="loadPage">
    </dialog-form-in>
  </div>
</template>
<script>
import { getTalentPoolPage } from '@/api/hrms/talent_pool'
import mixins from '@/mixins/mixins'
import { columnsMap } from '../options'
import DialogForm from './DialogForm'
import dialogFormIn from './dialogFormIn'
export default {
  mixins: [mixins],
  components: { DialogForm, dialogFormIn },
  data () {
    return {
      columnsMap,
      replaceText: (data) => `（支出：${data[0]}笔，支出金额：￥${data[1]}元，收入${data[2]}笔，收入金额￥${data[3]}元，抵扣：${data[4]}笔，抵扣金额${data[5]}元）`,
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
    loadPage (param = this.searchForm) {
      this.loadTable(param, getTalentPoolPage)
    },
    handlePay () {
      this.$refs['DialogForm'].dialogShow = true
    },
    handleIncome () {
      this.$refs['dialogFormIn'].dialogShow = true
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
.set-containter >>> .data-title .title-col {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 0;
}
.set-containter >>> .operation-container {
  margin-top: 20px;
}
</style>
