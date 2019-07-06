<template>
  <div class="librarys-content">
    <IepNoData v-if="dataList.length === 0"></IepNoData>
    <div v-else>
      <div class="content-page">
        <div v-for="(item,index) in dataList" :key="index" class="piece">
          <a-skeleton :loading="loading" active />
          <div v-if="!loading" style="cursor: pointer;" @click="handleOpen(item)">
            <div class="title">
              <h4 class="name">{{item.projectName}}</h4>
            </div>
            <div class="item">
              <span class="label">项目等级：{{transform(item.projectLevel, 'prms_project_level')}}</span>
              <span class="label">市场经理：{{item.mktManager}}</span>
            </div>
            <div class="box">
              <span>项目类型：{{transform(item.projectType, 'prms_project_type')}}</span>
              <span>发布人：{{item.publisherName}}</span>
              <span><i class="iconfont icon-shijian"></i>{{item.projectTime}}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;margin: 20px 0;">
        <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getProjectPage } from '@/api/app/prms/'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['dictGroup']),
  },
  data () {
    return {
      loading: true,
      dataList: [],
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods: {
    transform (value, dict) {
      if (value == '') return '暂无'
      for (let item of this.dictGroup[dict]) {
        if (item.value === value) {
          return item.label
        }
      }
      return value
    },
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/project_details/${row.id}`,
      })
    },
    loadPage () {
      this.loading = true
      getProjectPage(Object.assign({}, this.paramForm, this.params)).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    if (this.$route.query.id) {
      this.params.orgId = this.$route.query.id
    }
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
.content-page {
  min-height: 320px;
  .item {
    display: flex;
    flex-wrap: wrap;
    .label {
      margin-right: 20px;
    }
  }
}
.piece {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  & > p {
    font-size: 14px;
    color: #666;
    line-height: 28px;
  }
}
.title {
  .name {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin-right: 10px;
    font-size: 16px;
    color: #333;
  }
  i {
    margin-right: 10px;
    font-size: 22px;
    color: #aaa;
    vertical-align: -2px;
  }
}
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    line-height: 24px;
    color: #aaa;
    i {
      margin-right: 5px;
      font-size: 16px;
      color: #aaa;
      vertical-align: -2px;
    }
  }
}
</style>
