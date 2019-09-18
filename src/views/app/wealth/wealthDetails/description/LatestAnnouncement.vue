<template>
  <div>
    <el-scrollbar style="height:504px">
      <div class="librarys-item" v-for="(item,index) in dataList" :key="index">
        <a-skeleton :loading="loading" active />
        <template v-if="!loading">
          <div class="title">
            <h4 class="name">{{item.orgName}}</h4>
          </div>
          <p class="desc" v-text="item.content">
          </p>
          <div class="librarys-bottom">
            <span><i class="icon-shijian"></i>{{item.createTime}}</span>
          </div>
        </template>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { getNotificationPage } from '@/api/fams/investment'
function initDataItem () {
  return {
    createTime: '',
    content: '',
    orgName: '',
  }
}
export default {
  props: {
    org: {
      type: Object,
      require: true,
      default: () => { },
    },
  },
  data () {
    const dataList = []
    for (let i = 0; i < 10; i++) {
      dataList.push(initDataItem())
    }
    return {
      loading: true,
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      dataList: dataList,
    }
  },
  computed: {
    id () {
      return this.$route.params.id ? +this.$route.params.id : null
    },
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = val
      this.getBusinessPage()
    },
    getBusinessPage () {
      this.loading = true
      getNotificationPage(Object.assign({ id: this.id }, this.paramForm, this.params)).then(({ data }) => {
        this.total = data.data.total
        this.dataList = data.data.records
        this.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.getBusinessPage()
    },
    handleDetail (id) {
      this.$router.push(`/app/news/news_detail/${id}`)
    },
  },
  created () {
    this.getBusinessPage()
  },
}
</script>
<style lang="scss" scoped>
.librarys-item {
  padding: 20px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.title {
  height: 40px;
  line-height: 40px;
  .name {
    display: inline-block;
    margin-right: 10px;
    color: #333;
    font-size: 18px;
    &:hover {
      color: #cb3737;
    }
  }
  i {
    color: #666;
    font-size: 20px !important;
    vertical-align: -2px;
  }
}
.desc {
  margin-bottom: 15px;
  font-size: 14px;
  color: #666;
  line-height: 28px;
}
.librarys-bottom {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 15px;
    color: #999;
    font-size: 12px;
    line-height: 24px;
    &:hover {
      color: #cb3737;
    }
    i {
      margin-right: 5px;
      font-size: 16px !important;
      vertical-align: -2px;
    }
  }
  .tags {
    display: inline-block;
    span {
      padding: 3px 5px;
      margin-right: 8px;
      font-size: 12px;
      color: #999;
      border: 1px solid #ccc;
      border-radius: 3px;
      &:hover {
        background-color: #fef6f4;
        border: 1px solid #dc8687;
        color: #dc8687;
      }
    }
  }
}
</style>

