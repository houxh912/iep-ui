<template>
  <div class="article-details app-material-detail">
    <div class="title">{{formData.materialName}}</div>
    <div class="inform">
      <iep-img :src="formData.avatar" :alt="formData.creatorRealName" class="img"></iep-img>
      <span>{{formData.creatorRealName}}</span>
      <span class="time">{{formData.createTime}}</span>
      <span class="opt"><i class="iconfont icon-yanjing"></i>{{formData.views}}</span>
      <span class="opt"><i class="iconfont icon-download1"></i>{{formData.downloadTimes}}</span>
      <div class="btn sc" v-if="formData.collection == 0" @click="handleCollect(formData)"><i class="iconfont icon-iconfontxingxing"></i>收藏</div>
      <div class="btn sc" v-else><i class="iconfont icon-iconfontxingxing"></i>已收藏</div>
      <div class="btn fx" @click="handleShare"><i class="iconfont icon-youxiangshixin"></i>分享</div>
      <div class="btn jc" @click="handleWrong"><i class="iconfont icon-zhuyi"></i>纠错</div>
    </div>
    <div class="classes">{{getClass(formData.firstClass, formData.secondClass).first}} - {{getClass(formData.firstClass, formData.secondClass).second}}</div>
    <div class="introduction">{{formData.intro}}</div>
    <div class="content">
      <iep-html v-model="formData.content"></iep-html>
    </div>
    <el-row class="down-load" v-if="formData.attachFile">
      相关附件：
      <div class="file" v-for="(item, index) in formData.attachFileList" :key="index">
        <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}<span class="tip">（消耗 {{getMoney(formData.downloadCost)}} 下载）</span></div>
      </div>
    </el-row>
    <IepAppRewardCard :total="total" :dataList="rewardList" :userInfo="beRewardedPerson"></IepAppRewardCard>
    <IepAppEvaluationReviews :id="formData.id" :objectType="1"></IepAppEvaluationReviews>
    <collectionDialog ref="collection" type="material" :requestFn="createCollect" @load-page="loadData(route.id)"></collectionDialog>
    <share-dialog ref="share" type="material"></share-dialog>
    <wrongDialog ref="wrong"></wrongDialog>
  </div>
</template>
<script>
import { downloadCount, getDataById } from '@/api/mlms/material/datum/material'
import { downloadFile } from '@/api/common'
import { mapGetters } from 'vuex'
import { getConfigureTree } from '@/api/mlms/material/datum/configure'
import collectionDialog from '@/views/mlms/material/components/collectionDialog'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import { createCollect } from '@/api/mlms/material/summary'
import wrongDialog from '@/views/mlms/material/components/wrongDialog'

export default {
  components: { collectionDialog, ShareDialog, wrongDialog },
  data () {
    return {
      formData: {
        firstClass: '',
        secondClass: '',
        content: '',
        attachFileList: [],
      },
      desc: '数据基因是基于数据元和元数据的标准化编码基础上可实现数据自由编辑、抽取、复制和关联应用的核心机数体系',
      label: ['创业女杰', '浙商', '创新创业'],
      total: '6',
      rewardList: [
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
        { avatar: require('./img/people.png'), name: '杨冰之' },
      ],
      attachFileList: [
        { name: '内网2.0改造项目' },
      ],
      firstClass: [],
      route: this.$route.params,
      createCollect,
      beRewardedPerson: { id: '', name: '' },
    }
  },
  computed: {
    ...mapGetters(['dictGroup']),
  },
  methods: {
    // 附件下载
    downLoad (obj) {
      // if (this.formData.downloadCost > 0) {
      //   this.$message.error('对不起，您的余额不足！')
      //   return
      // }
      // downloadFile(obj)
      // downloadCount(this.formData.id)
      let fn = () => {
        downloadCount(this.formData.id).then(({ data }) => {
          if (data.data) {
            downloadFile(obj)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      if (this.getMoney(this.formData.downloadCost) == 0) {
        fn()
      } else {
        this.$confirm('下载此材料需要消耗国脉贝, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          fn()
        }).catch(() => { })
      }
    },
    loadData (id) {
      getDataById(id).then(({ data }) => {
        this.formData = data.data
        this.beRewardedPerson = {
          id: data.data.creator,
          name: data.data.creatorRealName,
        }
      })
    },
    getMoney (val) {
      for (let item of this.dictGroup.mlms_download_cost) {
        if (item.value == val) {
          return item.label
        }
      }
    },
    getClass (first, second) {
      if (!first || !second) {
        return { first: '', second: '' }
      }
      let obj = { first: '', second: '' }
      for (let item of this.firstClass) {
        if (item.id == first) {
          obj.first = item.levelName
          for (let t of item.childrens) {
            if (t.id == second) {
              obj.second = t.levelName
              console.log('obj: ', obj)
              return obj
            }
          }
        }
      }
      return obj
    },
    // 收藏
    handleCollect (row) {
      row.title = row.materialName
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 分享
    handleShare () {
      this.formData.name = this.formData.materialName
      this.$refs['share'].open([this.formData], `关于 ${this.formData.name} 材料的分享`)
    },
    // 纠错
    handleWrong () {
      this.$refs['wrong'].open({
        subject: `纠错：${this.formData.materialName}`,
        receiverIds: [this.formData.creator],
        receiverName: this.formData.creatorRealName,
      })
    },
  },
  created () {
    // 获取分类配置
    getConfigureTree().then(({ data }) => {
      this.firstClass = data.data
    })
    this.route = this.$route.params
    this.loadData(this.route.id)
  },
}
</script>
<style lang="scss" scoped>
.article-details {
  padding: 20px 0;
  .title {
    font-size: 22px;
    color: #333;
    // height: 50px;
    line-height: 50px;
  }
  .time,
  .opt {
    color: #999;
  }
  .opt {
    display: flex;
    align-items: center;
  }
  .inform {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    > span {
      margin-left: 10px;
      display: inline-block;
      > i {
        margin: 4px;
      }
      &:nth-child(4) {
        margin-left: 30px;
      }
      &:nth-child(5) {
        margin-left: 30px;
      }
    }
    .btn {
      cursor: pointer;
      position: absolute;
      top: 8px;
      font-size: 16px;
      color: #999;
      > i {
        margin: 4px;
      }
    }
    .sc {
      right: 150px;
      font-size: 14px;
      &:hover {
        color: #cb3737;
      }
    }
    .fx {
      right: 80px;
      font-size: 14px;
      &:hover {
        color: #cb3737;
      }
    }
    .jc {
      right: 10px;
      font-size: 14px;
      &:hover {
        color: #cb3737;
      }
    }
  }
  .classes {
    margin: 30px 0 20px 0;
  }
  .introduction {
    margin: 20px 0;
    padding: 20px;
    background-color: #fafafa;
  }
  .content {
    padding: 0 20px;
    margin: 0 0 20px;
  }
  .down-load {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        color: #cb3737;
      }
      &:hover i,
      &:hover .tip {
        color: #cb3737;
      }
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
    }
  }
}
</style>
<style lang="scss">
.app-material-detail {
  .inform {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: inline-block;
    }
  }
}
</style>

<style scoped>
.inform >>> .el-image {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}
.inform >>> .el-image__inner {
  border-radius: 50%;
}
</style>
