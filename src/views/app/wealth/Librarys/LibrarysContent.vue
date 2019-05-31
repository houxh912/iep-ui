<template>
  <div class="librarys-content">
    <div v-for="(item,index) in dataList" :key="index" class="piece" >
      <div style="cursor: pointer;" @click="handleOpen(item)">
        <div class="title">
          <h4 class="name">{{item.name}}</h4>
        </div>
        <div class="box">
          <span>目标金额：{{item.creatorRealName}}</span>
          <span>已投人数：{{item.creatorRealName}}</span>
          <span>投资方式：{{item.creatorRealName}}</span>
          <span><i class="iconfont icon-shijian"></i>{{item.createTime}}</span>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import { getMaterialLPage } from '@/api/app/mlms/index'

export default {
  data () {
    return {
      dataList: [],
      secondClass: '',
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
    }
  },
  methods:{
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/wealth/wealth_details/${row.id}`,
      })
    },
    loadPage () {
      getMaterialLPage(Object.assign({}, this.paramForm, this.params)).then(({data}) => {
        this.dataList = data.data.records
        this.total = data.data.total
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style lang="scss" scoped>
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
    color:#333;
  }
  i {
    margin-right: 10px;
    font-size: 22px;
    color: #aaa;
    vertical-align: -2px;
  }
}
.box {
  span {
    margin-right: 20px;
    color: #aaa;
    i {
      margin-right: 5px;
      font-size: 18px;
      color: #aaa;
      vertical-align: -2px;
    }
  }
}
</style>
