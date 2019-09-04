<template>
  <div class="comment-page">
    <div class="comment-list">
      <div v-for="(item, index) in commentList" :key="index">
        <commentTpl :item="item" :userData="{id: data.userId, name: data.userName}" @load-page="loadPage"></commentTpl>
        <commentTpl v-for="(comItem, comIndex) in item.thoughtsReplyList" :key="`${index}-${comIndex}`" :item="comItem" :userData="{id: item.commentUserId, name: item.realName}" @load-page="loadPage" type="reply"></commentTpl>
      </div>
    </div>
    <div class="comment-pagination">
      <el-pagination layout="prev, pager, next, total" :current-page.sync="params.current" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCommentsByThoughtsId } from '@/api/cpms/thoughts'
import commentTpl from './commentTpl'

const initParamsForm = () => {
  return {
    current: 1,
    size: 10,
  }
}

export default {
  components: { commentTpl },
  props: {
    data: {
      type: Object,
    },
  },
  data () {
    return {
      commentList: [],
      params: initParamsForm(),
      total: 0,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    loadPage () {
      getCommentsByThoughtsId(this.params).then(({ data }) => {
        this.commentList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    this.params.thoughtsId = this.data.thoughtsId
    this.loadPage()
  },
  watch: {
    'data.commentNum' () {
      this.loadPage()
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-page {
  background-color: #fafafa;
  margin-top: 15px;
  .comment-list {
    padding: 15px;
    border-radius: 3px;
    .comment {
      margin: 0 10px;
      border-bottom: 1px solid #eee;
    }
  }
  .comment-pagination {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
<style scoped>
.comment-pagination >>> .btn-prev, .comment-pagination >>> .btn-next, .comment-pagination >>> .number {
  background-color: #fafafa;
}
</style>