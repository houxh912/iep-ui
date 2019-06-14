<template>
  <div class="librarys-content">
    <div v-for="(item,index) in dataList" :key="index" class="piece">
      <a-skeleton :loading="loading" active />
      <template v-if="!loading">
        <div>
          <div @click="handleOpen(item)" style="cursor: pointer;">
            <div class="title">
              <h4 class="name">{{item.name}}</h4>
              <i class="iconfont icon-caifu" v-if="item.downloadCost !== '0'"></i>
              <i class="iconfont icon-fujian" v-if="item.attachFile !== ''"></i>
            </div>
            <p>{{item.intro}}</p>
          </div>
          <div class="box">
            <span class="uploaded">上传者：{{item.creatorRealName}}</span>
            <span><i class="iconfont icon-shijian"></i>{{item.createTime}}</span>
            <span><i class="iconfont icon-yanjing"></i>{{item.views}}人浏览</span>
            <span><i class="iconfont icon-download1"></i>{{item.downloadTimes}}人下载</span>
            <span style="cursor: pointer;" v-if="item.collection == 0" @click="handleCollect(item)"><i class="icon-heart"></i>收藏</span>
            <span style="cursor: pointer;" v-else><i class="icon-aixin"></i>已收藏</span>
            <span style="cursor: pointer;" @click="handleShare(item)"><i class="icon-share"></i>分享</span>
          </div>
        </div>
        <div v-for="(item,index) in item.tagKeyWords" :key="index" class="label">
          <span>{{item}}</span>
        </div>
      </template>
    </div>
    <div style="text-align: center;margin: 20px 0;">
      <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="params.size" @current-change="currentChange"></el-pagination>
    </div>
    <collectionDialog ref="collection" type="material" :requestFn="createCollect" @load-page="loadPage"></collectionDialog>
    <share-dialog ref="share" type="material"></share-dialog>
  </div>
</template>
<script>
import { getMaterialLPage } from '@/api/app/mlms/index'
import collectionDialog from '@/views/mlms/material/components/collectionDialog'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import { createCollect } from '@/api/mlms/material/summary'

function initDataItem () {
  return {
    tagKeyWords: [],
    downloadTimes: 0,
    views: 0,
    creatorRealName: '',
    createTime: 0,
    attachFile: '',
    downloadCost: 0,
    name: '',
    intro: '',
  }
}
export default {
  components: {
    collectionDialog,
    ShareDialog,
  },
  data () {
    const dataList = []
    for (let i = 0; i < 10; i++) {
      dataList.push(initDataItem())
    }
    return {
      loading: true,
      dataList: dataList,
      secondClass: '',
      paramForm: {},
      total: 0,
      params: {
        current: 1,
        size: 10,
      },
      createCollect,
    }
  },
  methods: {
    searchData (val) {
      this.params.current = 1
      this.paramForm = Object.assign({}, this.paramForm, val)
      this.loadPage()
    },
    handleOpen (row) {
      this.$router.push({
        path: `/app/resource/material/material_detail/${row.id}`,
      })
    },
    loadPage () {
      this.loading = true
      getMaterialLPage(Object.assign({}, this.paramForm, this.params)).then(({ data }) => {
        this.dataList = data.data.records
        this.total = data.data.total
        this.loading = false
      })
    },
    currentChange (val) {
      this.params.current = val
      this.loadPage()
    },
    handleCollect (row) {
      row.title = row.name
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    handleShare (row) {
      this.$refs['share'].open([row], `关于 ${row.name} 材料的分享`)
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
    margin-right: 10px;
    font-size: 16px;
    color: #333;
  }
  i {
    margin-right: 10px;
    font-size: 20px;
    color: #aaa;
    vertical-align: -2px;
  }
}
.box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
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
.label {
  display: inline-block;
  margin-bottom: 15px;
  & > span {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 12px;
    color: #666;
    &:hover {
      background-color: #fef6f4;
      border: 1px solid #dc8687;
      color: #dc8687;
      cursor: pointer;
    }
  }
}
</style>
