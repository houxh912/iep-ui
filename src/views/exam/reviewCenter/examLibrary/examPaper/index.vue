<template>
  <div>
    <operation-container>
      <template slot="left">
        <iep-button type="danger" @click="handleDeleteAll">批量删除</iep-button>
        <iep-button class="tip">当前已选择<span>{{Value}}</span>项</iep-button>
        <iep-button class="empty" @click="handleEmpty">清空</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage">
        </operation-search>
      </template>
    </operation-container>

    <iep-table :columnsMap="columnsMap" :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange" @selection-change="selectionChange" is-mutiple-selection is-index>
      <el-table-column prop="field" label="状态">
        <template slot-scope="scope">
          <el-tag type="warning" size="medium" v-if="scope.row.field === 0">无关联</el-tag>
          <el-tag type="success" size="medium" v-if="scope.row.field === 1">关联中</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="240">
        <template slot-scope="scope">
          <operation-wrapper>
            <iep-button @click="handleRollingTest(scope.row)">收卷</iep-button>
            <iep-button @click="handlesetTest(scope.row)">设为可考</iep-button>
            <iep-button @click="handleDelete(scope.row)">删除</iep-button>
          </operation-wrapper>
        </template>
      </el-table-column>
    </iep-table>
    <!-- <dialog-form ref="DialogForm" @load-page="loadPage"></dialog-form> -->
  </div>
</template>
<script>
import { getExamInationList } from '@/api/exam/examLibrary/examInation/examInation'
//  import { getExamPaperList, RollingTestById, setTestById,deleteById, deleteIdAll } from '@/api/exam/examLibrary/examPaper/examPaper'
import mixins from '@/mixins/mixins'
const columnsMap = [
  {
    label: '姓名',
    prop: 'field',
  },
  {
    label: '准考证号',
    prop: 'field',
  },
  {
    label: '笔试分数',
    prop: 'field',
    // type: 'dict',
  },
  {
    label: '面试分数',
    prop: 'field',
  },
  {
    label: '面试人',
    prop: 'field',
  },
  {
    label: '剩余时间',
    prop: 'field',
  },
]
export default {
  mixins: [mixins],
  components: {},
  data () {
    return {
      columnsMap,
      Value: 0,
      selectValue: false,
      selectionValue: '',
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    /**
     * 获取列表分页数据
     */
    loadPage (param = this.searchForm) {
      this.loadTable(param, getExamInationList)
    },

    /**
     * 收卷
     */
    handleRollingTest (row) {
      // this._handleComfirm([row.id], RollingTestById, '收卷')
      console.log(row.id)
    },


    /**
     * 设为可考
     */
    handlesetTest (row) {
      // this._handleComfirm([row.id], setTestById, '设为可考')
      console.log(row.id)
    },

    /**
     * 删除
     */
    handleDelete (row) {
      // this._handleComfirm([row.id], deleteById, '删除')
      console.log(row.id)
    },

    /**
     * 多项选择，判断是否选择
     */
    selectionChange (val) {
      this.Value = val.length
      if (val.map(m => m.id) == '') {
        this.selectValue = false
        return
      }
      else {
        this.selectValue = true
        this.selectionValue = val.map(m => m.id)
        //console.log(val)
        return
      }
    },

    /**
     * 批量删除
     */
    handleDeleteAll () {
      if (this.selectValue == false) {
        this.$message.error('请至少选择一项试题！')
        return
      }
      if (this.selectValue == true) {
        // deleteIdAll(this.selectionValue).then(() => {
        //   this.$message({
        //     message: '操作成功',
        //     type: 'success',
        //   })
        //   this.loadPage()
        // })
      }
    },

    /**
     * 清空选择
     */
    handleEmpty () {
      this.Value = 0
      console.log(22)
    },
  },
}
</script>
<style lang="scss" scoped>
.tip {
  border: 0px solid #ccc;
  &:hover {
    background-color: #fff;
  }
  span {
    color: #419fff;
    font-size: 20px;
    margin: 3px 6px;
  }
}
.empty {
  border: 0px solid #ccc;
  color: #419fff;
  &:hover {
    background-color: #fff;
  }
}
</style>
