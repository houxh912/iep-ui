<template>
  <div class="thought-page">
    <library ref="library" @load-page="submitCallBack" :dataList="dataList" :params="params" @fresh-right="freshRight" @fresh-all="freshAll"></library>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :current-page.sync="params.current" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import library from './library'

const initFormData = () => {
  return {
    replyMsg: '',
    thoughtsId: 0,
    nameList: [],
  }
}

export default {
  components: { library },
  props: {
    requestFn: {
      default: () => { },
    },
    paramData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  data () {
    return {
      form: initFormData(),
      dataList: [],
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods: {
    // 打赏
    ...mapActions(['famsReward']),
    handleReward (row) {
      this.famsReward({ id: row.userId, name: row.userName })
    },
    submitCallBack () {
      this.loadPage()
    },
    loadPage () {
      this.requestFn(Object.assign({}, this.params, this.paramData)).then(({ data }) => {
        this.$set(this, 'dataList', data.data.records.splice(5))
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    freshRight (val) {
      this.$emit('fresh-right', val)
    },
    freshAll () {
      this.$emit('fresh-all', true)
    },
  },
  created () {
    this.loadPage()
  },
}
</script>

<style lang="scss" scoped>
.thought-page {
  width: 100%;
}
</style>

<style scoped>
.library >>> .forward-content {
  background-color: #fafafa;
  padding: 20px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
