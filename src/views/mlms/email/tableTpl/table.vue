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
            <!-- 普通的已读未读 -->
            <span v-if="pageState==='ordinary'">
              <i class="icon-yiduyoujian mail" v-if="(scope.row.isReade===1 || scope.row.isReade==null)"></i>
              <i class="icon-youjian mail select" v-else @click="handleIsRead(scope.row)"></i>
            </span>
            <!-- 已发送状态下 kind-0普通，1是回复，2转发 -->
            <span v-else>
              <i class="icon-yiduyoujian mail" v-if="scope.row.kind===0"></i>
              <i class="icon-huifu mail" v-if="scope.row.kind===1"></i>
              <i class="icon-zhuanfa mail" v-if="scope.row.kind===2"></i>
            </span>
            <i class="icon-fujian fujian" :class="scope.row.hasFile ? 'select':''"></i>
          </div>
        </template>
      </el-table-column>
    </template>
    <el-table-column prop="name" label="主题" min-width="160">
      <template slot-scope="scope">
        <div class="mail-name" @click="handleDetail(scope.row)">{{scope.row.subject}}</div>
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
import { deleteEmailById, emailStarById, isReadeById, getEmailById } from '@/api/mlms/email/index'

export default {
  name: 'custom',
  mixins: [mixins],
  components: {  },
  computed: {},
  props: {
    pageState: {
      type: String,
      default: 'ordinary',
    },
    type: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      dictsMap,
      columnsMap: tableOption,
      requestFn: () => {},
    }
  },
  methods: {
    handleDetail (row) {
      getEmailById(row.emailId).then(({data}) => {
        this.$emit('switchDialog', data.data)
      })
    },
    // 已读
    handleIsRead (row) {
      isReadeById(row.emailId).then(()=>{})
      this.loadPage(this.pageOption)
    },
    handleDeleteById (row) {
      this._handleGlobalDeleteById(row.id, deleteEmailById)
    },
    selectionChange (val) {
      this.$emit('multipleSelection', val.map(m => m.emailId), val)
    },
    loadPage (param = {}) {
      this.isLoadTable = true
      param.type = this.type
      this.requestFn({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current, condition } = data.data
        this.pagination = { current, size, total }
        this.pagedTable = records.map(m => m)
        this.isLoadTable = false
        this.$emit('readList', [total, condition.unRead])
      })
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
