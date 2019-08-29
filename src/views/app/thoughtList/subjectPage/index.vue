<template>
  <div class="subject">
    <div class="list">
      <div class="subject-item" v-for="(item, index) in list" :key="index">
        <div class="head">
          <div class="roof" v-if="item.status === 2">置顶</div>
          <div class="title" @click="handleDetail(item)">#{{item.content}}#</div>
        </div>
        <div class="footer">
          <div class="num">讨论数：{{item.hot}}</div>
          <div class="creater">话题发起人：<span class="name" @click="handleCreater(item.creatorId)">{{item.creatorName}}</span></div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { getTableData } from '@/api/cpms/iepcommontopic'
const initParams = () => {
  return {
    current: 1,
    size: 10,
  }
}
export default {
  data () {
    return {
      total: 0,
      params: initParams(),
      list: [],
      searchForm: {
        content: '',
      },
    }
  },
  methods: {
    currentChange (val) {
      this.params.current = val
      this.getTableData()
    },
    getTableData () {
      getTableData(Object.assign({}, this.params, this.searchForm)).then(({ data }) => {
        this.list = data.data.records
        this.total = data.data.total
      })
    },
    // 人物
    handleCreater (id) {
      this.$router.push(`/app/personal_style/${id}`)
    },
    // 详情
    handleDetail (row) {
      this.$router.push({
        path: '/app/subject_list',
        query: {
          title: row.content,
          id: row.topicId,
        },
      })
    },
    // 搜索
    search (params) {
      this.searchForm = Object.assign({}, this.searchForm, params)
      this.getTableData()
    },
  },
  created () {
    this.getTableData()
  },
}
</script>

<style lang="scss" scoped>
.subject {
  .list {
    margin-bottom: 20px;
    .subject-item {
      border-bottom: 1px solid #eee;
      .head {
        margin: 10px 0;
        display: flex;
        .roof {
          color: #ba1b21;
          border: 1px solid #ba1b21;
          height: 24px;
          line-height: 24px;
          padding: 0 5px;
          border-radius: 3px;
          margin-right: 20px;
          font-size: 12px;
        }
        .title {
          font-size: 18px;
          cursor: pointer;
        }
      }
      .footer {
        display: flex;
        margin-bottom: 10px;
        .num {
          color: #999;
          margin-right: 30px;
        }
        .creater {
          color: #999;
          .name {
            cursor: pointer;
          }
        }
      }
    }
  }
  .pagination {
    text-align: center;
  }
}
</style>