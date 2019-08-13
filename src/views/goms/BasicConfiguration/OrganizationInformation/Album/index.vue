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
    <iep-no-data v-if="!list.length"></iep-no-data>
    <div class="album-block" v-for="(item, index) in list" :key="index">
      <div class="title" @click="handleClick(index)">
        <span class="time">{{item.time}}</span>
        <i :class="isShow[index] ? '' : 'isRotate'" class="el-icon-arrow-down"></i>
        <!-- <i :class="isRotate" class="el-icon-arrow-down"></i> -->
      </div>
      <div class="album-lib" v-show="isShow[index]">
        <div class="lib-ibox" v-for="(t, i) in item.list" :key="i" @mouseenter="mouseover(t, i)" @mouseleave="mouseLeave(t, i)">
          <div class="close" v-if="mouseIndex === i" @click="handleDelete(t)"><i class="el-icon-close"></i></div>
          <iep-img :src="t.imageUrl" alt="" @click.native="handleUpdate(t)"></iep-img>
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
import { mapGetters } from 'vuex'
import mixins from '@/mixins/mixins'
import { orgDelete } from '@/api/goms/org_album'

export default {
  components: { formDialog },
  mixins: [mixins],
  data () {
    return {
      isShow: [],
      isRotate: '',
      list: [],
      mouseIndex: -1,
      params: {
        current: 1,
        size: 12,
        orgId: '',
      },
      paramForm: { title: '' },
      total: 0,
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    loadPage () {
      geOrgPage(Object.assign({}, this.params, this.paramForm)).then(({ data }) => {
        this.list = this.dealWithList(data.data.records)
        this.total = data.data.total
      })
    },
    // 根据时间分组
    dealWithList (row) {
      if (!row.length) {
        return []
      }
      let list = []
      let obj = { time: dateFormat(row[0].publishTime, 'yyyy-MM'), list: [] }
      this.activeNames = [0]
      for (let index in row) {
        let item = row[index]
        let startTime = dateFormat(item.publishTime, 'yyyy-MM')
        if (obj.time == startTime) {
          obj.list.push(item)
        } else {
          this.activeNames.push(this.activeNames[this.activeNames.length - 1] + 1)
          list.push(obj)
          this.isShow.push(true)
          obj = { time: startTime, list: [item] }
        }
      }
      list.push(obj)
      this.isShow.push(true)
      return list
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    handleClick (index) {
      this.$set(this.isShow, index, !this.isShow[index])
      console.log('isShow: ', this.isShow)
    },
    handleClose (index) {
      this.imgList.splice(index, 1)
    },
    handleCreate () {
      this.$refs['create'].open()
    },
    handleUpdate (row) {
      this.$refs['create'].open(row)
    },
    handleDelete (row) {
      this._handleGlobalDeleteById(row.id, orgDelete)
    },
    searchPage (val) {
      this.paramForm = val
      this.loadPage()
    },
    mouseover (val, index) {
      this.mouseIndex = index
    },
    mouseLeave () {
      this.mouseIndex = -1
    },
  },
  created () {
    this.params.orgId = this.userInfo.orgId
    this.loadPage()
  },
}
</script>
<style scoped lang='scss'>
.album {
  .album-block {
    margin-bottom: 30px;
  }
  .title {
    font-size: 16px;
    color: #333;
    .isRotate {
      transform: rotate(-90deg);
      transition: 0.3s;
    }
    .time {
      margin-right: 5px;
    }
    .num {
      margin-right: 10px;
      color: #999;
    }
    i {
      cursor: pointer;
      color: #999;
      vertical-align: -1px;
    }
  }
  .album-list {
    padding: 20px 15px;
    color: #ccc;
    i {
      display: block;
      font-size: 34px !important;
    }
  }
  .album-lib {
    padding: 20px 15px;
    display: flex;
    flex-wrap: wrap;
    .lib-ibox {
      position: relative;
      display: inline-block;
      margin-bottom: 20px;
      margin-right: 50px;
      text-align: center;
      span {
        display: block;
      }
      .close {
        position: absolute;
        right: -9px;
        top: -9px;
        width: 18px;
        height: 18px;
        font-size: 14px !important;
        background-color: #fff;
        color: #ccc;
        border-radius: 50%;
        line-height: 18px;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: $--menu-color-second;
        }
      }
    }
  }
}
</style>
<style scoped>
.album >>> .el-upload-dragger {
  padding: 30px 100px 38px;
  width: inherit;
  height: inherit;
}
.album >>> .el-upload__text {
  line-height: 22px;
  color: #999;
}
.lib-ibox >>> img {
  margin-bottom: 10px;
  width: 260px;
  height: 135px;
}
</style>
