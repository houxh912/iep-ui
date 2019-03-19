<template>
  <iep-table 
    :isLoadTable="isLoadTable"
    :pagination="pagination"
    :dictsMap="dictsMap"
    :columnsMap="columnsMap"
    :pagedTable="pagedTable"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    is-index
    isMutipleSelection
    @selection-change="selectionChange">
    <template slot="before-columns">
      <el-table-column label="">
        <template slot-scope="scope">
          <div class="mail-icon">
            <i class="icon-shoucang1 star" :class="(scope.row.isStar===true || scope.row.isStar===null)?'select':''" @click="emailStar(scope.row)"></i>
            <i class="icon-youxiang mail"></i>
            <i class="icon-fujian fujian"></i>
          </div>
        </template>
      </el-table-column>
    </template>
    <el-table-column prop="name" label="主题" min-width="160">
      <template slot-scope="scope">
        <div class="mail-name" @click="handleDetail(scope.row)">{{scope.row.subject}}</div>
        <el-col class="mail-tags">
          <el-tag type="info" size="mini" v-for="(item, index) in scope.row.code" :key="index">{{item}}</el-tag>
        </el-col>
      </template>
    </el-table-column>
    <el-table-column prop="" label="发送时间">
      <template slot-scope="scope">
        {{scope.row.createTime}}
      </template>
    </el-table-column>
  </iep-table>
</template>

<script>
import mixins from '@/mixins/mixins'
import { tableOption, dictsMap } from './option'
import { deleteEmailById, emailStarById, isReadeById } from '@/api/mlms/email/index'

export default {
  name: 'custom',
  mixins: [mixins],
  components: {  },
  computed: {},
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
      requestFn: () => {},
    }
  },
  methods: {
    handleDetail (row) {
      isReadeById(row.emailId).then(()=>{})
      this.$emit('switchDialog', row)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteEmailById)
    },
    selectionChange (val) {
      console.log('val: ', val)
    },
    loadPage (param) {
      this.loadTable(param, this.requestFn)
    },
    // 星标
    emailStar (row) {
      emailStarById(row.emailId).then(() => {
        this.loadPage()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.mail-icon {
  .star {
    margin-right: 50px;
  }
  .mail {
    margin-right: 20px;
  }
  i {
    cursor: pointer;
  }
  i.select {
    color: #df7b1b;
  }
}
.mail-name {
  width: 100%;
  cursor: pointer;
  margin-bottom: 10px;
}
.mail-tags {
  margin: 0;
  .el-tag {
    margin-right: 5px;
    height: 26px;
    line-height: 26px;
  }
}
</style>
