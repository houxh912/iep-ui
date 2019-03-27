
<template>
  <div class="consultation">
    <operation-wrapper>
      <iep-button class="btn" type="danger" plain @click="handleAdd"><i class="el-icon-plus"></i> 添加资讯</iep-button>
    </operation-wrapper>
    <iep-table :isLoadTable="false" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column>
          <template slot-scope="scope">
            <div class="item">
              <div class="head">
                <p class="title">{{scope.row.title}}</p>
                <p class="date">{{scope.row.date}}</p>
              </div>
              <div class="content">
                <div class="msg">{{scope.row.msg}}</div>
                <div class="code">
                  <el-tag class="code-item" type="info" v-for="(item, index) in scope.row.tags" :key="index">{{item}}</el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
    </iep-table>
    <info-dialog ref="InfoDialog" @load-page="loadPage"></info-dialog>
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import InfoDialog from './InfoDialog'
import { createConsultation } from '@/api/crms/information'
export default {
  mixins: [mixins],
  components: { InfoDialog },
  data () {
    return {
      list: [],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
      pagedTable: [{ title: 'dasd', date: 'sadasd', msg: 'dasdddddddddadsadasd', tags: ['one', 'two'] }],
    }
  },
  methods: {
    handleAdd () {
      this.$refs['InfoDialog'].dialogShow = true
      this.$refs['InfoDialog'].methodName = '新增'
      this.$refs['InfoDialog'].submitFn = createConsultation
    },
    loadPage () {

    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.consultation {
  .item {
    width: 100%;
    margin-bottom: 10px;
    .head {
      display: flex;
      .title {
        flex: 1;
        font-weight: 700;
      }
      .date {
        align-items: right;
        width: 80px;
      }
    }
    .content {
      background-color: #f3f3f3;
      padding: 20px;
      .code {
        text-align: right;
        .code-item {
          margin-left: 15px;
        }
      }
    }
  }
  .add-consulta {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ececec;
    cursor: pointer;
  }
}
</style>

