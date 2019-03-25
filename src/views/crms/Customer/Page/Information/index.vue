
<template>
  <div class="consultation">
    <iep-table :isLoadTable="isLoadTable" :pagination="pagination" :pagedTable="pagedTable" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      <template slot="before-columns">
        <el-table-column label="客户名称">
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
    <div class="add-consulta" @click="handleAdd"><i class="el-icon-plus"></i> 添加资讯</div>
    <info-dialog ref="InfoDialog" @load-page="loadPage"></info-dialog>
  </div>
</template>

<script>
import InfoDialog from './InfoDialog'
import { createConsultation } from '@/api/crms/custom'
export default {
  name: 'consultation',
  components: { InfoDialog },
  data () {
    return {
      list: [],
      formData: {},
      rules: {},
      methodName: '',
      dialogShow: false,
    }
  },
  methods: {
    handleAdd () {
      this.$refs['InfoDialog'].dialogShow = true
      this.$refs['InfoDialog'].methodName = '新增'
      this.$refs['InfoDialog'].submitFn = createConsultation
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
    margin-bottom: 10px;
    .head {
      display: flex;
      .title {
        flex: 1;
        font-weight: 700;
      }
      .date {
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

