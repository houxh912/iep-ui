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
  </div>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getInfoPage } from '@/api/crms/information'
export default {
  mixins: [mixins],
  data () {
    return {

    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage (param) {
      this.loadTable(param, getInfoPage)
    },
    handleCreate () {

    },
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
        .code-item {
          margin: 10px 15px 10px 0;
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
