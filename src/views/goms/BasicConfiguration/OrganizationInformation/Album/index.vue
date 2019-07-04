<template>
  <div class="album">
    <operation-container>
      <template slot="left">
        <iep-button size="small" type="primary" icon="el-icon-plus" plain @click="handleCreate">新增</iep-button>
      </template>
      <template slot="right">
        <operation-search @search-page="searchPage" placeHolder="请输入关键字" prop="title"></operation-search>
      </template>
    </operation-container>
    <div class="album-block" v-for="(item, index) in list" :key="index">
      <div class="title" @click="handleClick">
        <span class="time">{{item.time}}</span>
        <!-- <span class="num">(共{{90}}张)</span> -->
        <i :class="isRotate" class="el-icon-arrow-down"></i>
      </div>
      <div class="album-lib" v-show="isShow">
        <div class="lib-ibox" v-for="(t, i) in item.list" :key="i">
          <iep-img :src="t.imageUrl" alt=""></iep-img>
          <!-- <i class="icon-shanchu1 close" @click="handleClose(index)"></i> -->
          <span>{{t.title}}</span>
        </div>
      </div>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
    <formDialog ref="create" @load-page="loadPage"></formDialog>
  </div>
</template>

<script>
import { geOrgPage } from '@/api/goms/org_album'
import formDialog from './formDialog'
import { dateFormat } from '@/util/date'

export default {
  components: { formDialog },
  data () {
    return {
      isShow: true,
      isRotate: '',
      list: [],
      params: {
        current: 1,
        size: 12,
      },
      paramForm: {title: ''},
      total: 0,
    }
  },
  methods:{
    loadPage () {
      geOrgPage(Object.assign({}, this.params, this.paramForm)).then(({data}) => {
        if (data.data) {
          this.list = this.dealWithList(data.data.records)
          this.total = data.data.total
        }
      })
    },
    // 根据时间分组
    dealWithList (row) {
      let list = []
      let obj = {time: dateFormat(row[0].publishTime, 'yyyy-MM'), list: []}
      this.activeNames = [0]
      for (let index in row) {
        let item = row[index]
        let startTime = dateFormat(item.publishTime, 'yyyy-MM')
        if (obj.time == startTime) {
          obj.list.push(item)
        } else {
          this.activeNames.push(this.activeNames[this.activeNames.length-1]+1)
          list.push(obj)
          obj = {time: startTime, list: [item]}
        }
      }
      list.push(obj)
      return list
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    handleClick () {
      this.isShow = !this.isShow
      this.isRotate = this.isRotate? '' : 'isRotate'
    },
    handleClose (index) {
      this.imgList.splice(index,1)
    },
    handleCreate () {
      this.$refs['create'].open()
    },
    searchPage (val) {
      this.paramForm = val
      this.loadPage()
    },
  },
  created () {
    this.loadPage()
  },
}
</script>
<style scoped lang='scss'>
.album{
  .album-block{
    margin-bottom: 30px;
  }
  .title{
    font-size: 16px;
    color:#333;
    .isRotate{
      transform: rotate(-90deg);
      transition: .3s;
    }
    .time{
      margin-right: 5px;
    }
    .num{
      margin-right: 10px;
      color:#999;
    }
    i{
      cursor: pointer;
      color:#999;
      vertical-align: -1px;
    }
  }
  .album-list{
    padding: 20px 15px;
    color:#ccc;
    i{
      display:block;
      font-size: 34px!important;
    }
  }
  .album-lib{
    padding: 20px 15px;
    display: flex;
    flex-wrap: wrap;
    .lib-ibox{
      position: relative;
      display:inline-block;
      margin-bottom: 20px;
      margin-right: 50px;
      text-align: center;
      span{
        display:block;
      }
      .close{
        position: absolute;
        right:-9px;
        top:-9px;
        width: 18px;
        height: 18px;
        font-size: 14px!important;
        background-color: #fff;
        color:#ccc;
        border-radius: 50%;
        line-height: 18px;
        cursor: pointer;
        &:hover{
          color:#fff;
          background-color: #f9eae7;
        }
      }
    }
  }
}
</style>
<style scoped>
.album >>> .el-upload-dragger{
  padding: 30px 100px 38px;
  width:inherit;
  height:inherit;
}
.album >>> .el-upload__text{
  line-height: 22px;
  color:#999;
}
.lib-ibox >>> img {
  margin-bottom: 10px;
  width: 260px;
  height:135px;
}
</style>
