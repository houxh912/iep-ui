<template>
  <basic-container>
    <el-col class="left">
      <iep-page-header :title="formData.honorQualName" :backOption="backOption"></iep-page-header>

      <el-row class="info">
        <div class="person">
          <div class="name">{{formData.creatorRealName}}</div>
          <div class="date">{{formData.createTime}}</div>
          <!-- <i class="icon-yanjing icon"></i>
          <div class="open"> 111</div>
          <i class="icon-download icon"></i>
          <div class="down"> 88</div> -->
        </div>
      </el-row>
      <el-row class="sub-title">
        <pre>{{formData.intro}}</pre>
      </el-row>
      <el-row class="image">
        <iep-img v-if="formData.image" :src="formData.image" class="img-avatar"></iep-img>
      </el-row>
      <el-row class="down-load" v-if="formData.attachFileList.length > 0">
        相关附件：
        <div class="file" v-for="(item, index) in formData.attachFileList" :key="index">
          <div @click="downLoad(item)"><i class="icon-fujian"></i>{{item.name}}<span class="tip">（消耗{{getMoney(formData.downloadCost)}}下载）</span></div>
        </div>
      </el-row>
      <el-row class="footer">
        <div class="footer-left">
          <!-- <el-tag v-for="(item, index) in formData.tagKeyWords" :key="index" type="info">{{item}}</el-tag> -->
          <iep-tag-detail v-model="formData.tagKeyWords"></iep-tag-detail>
        </div>
        <div class="footer-right" v-if="isDelete">
          <IepFiveKay>
            <IepKeyItem icon="icon-aixin" name="已收藏" @click.native="handleCollect" isChecked v-if="formData.collection == 1"></IepKeyItem>
            <IepKeyItem icon="icon-heart" name="收藏" @click.native="handleCollect" v-else></IepKeyItem>
          </IepFiveKay>
        </div>
      </el-row>
    </el-col>

    <el-col class="right">
      <div class="info">
        <div class="name">{{formData.creatorRealName}}</div>
        <div class="num">共{{materialTotal}}篇材料</div>
        <div class="foot">
          <iep-button type="primary" disabled @click="subscribe" plain>订阅</iep-button>
          <iep-button @click="apprentice">向他拜师</iep-button>
        </div>
      </div>
      <div class="material">
        <h3>优秀材料</h3>
        <p v-for="(item, index) in greatMaterialList" :key="index" @click="handleDetail(item)">{{item.name}}</p>
      </div>
    </el-col>
    <!-- 拜师 -->
    <el-dialog title="拜师" :visible.sync="apprenticeShow" width="330px" center>
      <div style="text-align: center;">是否确认向 【{{formData.creatorRealName}}】 拜师</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="apprenticeShow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleApprenticeConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <collection-dialog ref="collection" @load-page="loadPage" type="honor" :requestFn="createCollect"></collection-dialog>
    <share-dialog ref="share" type="material"></share-dialog>
  </basic-container>
</template>

<script>
import { getGreatMaterial, getMaterialTotal } from '@/api/mlms/material/datum/material'
import { downloadCount, getDataById } from '@/api/mlms/material/datum/aptitude'
import { commentMaterial, getCommentPage } from '@/api/mlms/index'
import { downloadFile } from '@/api/common'
import CollectionDialog from '../../components/collectionDialog'
import { createCollect } from '@/api/mlms/material/summary'
import ShareDialog from '@/views/mlms/material/components/shareDialog'
import { mapGetters } from 'vuex'
import { addMasterWorker } from '@/api/cpms/characterrelations'

function commentForm () {
  return {
    objectType: 1,
    commentObjectId: 0,
    commentContent: '',
    score: 5,
  }
}

const pageSize = {
  size: 10,
  current: 1,
  total: 0,
}

export default {
  components: { CollectionDialog, ShareDialog },
  props: {
    detailState: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['dictGroup', 'userInfo']),
  },
  data () {
    return {
      formData: {
        attachFileList: [],
      },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          if (this.detailState) {
            this.$emit('backPage', false)
          } else {
            this.$router.history.go(-1)
          }
        },
      },
      comment: commentForm(),
      commentList: [],
      materialTotal: 0,
      greatMaterialList: [],
      isCommentShow: false,
      createCollect,
      pageSize,
      isDelete: true,
      apprenticeShow: false,
    }
  },
  methods: {
    submit () {
      if (this.comment.commentContent == '') {
        this.$message.error('请先填写评论的内容！')
        return
      }
      this.comment.commentObjectId = this.formData.id
      commentMaterial(this.comment).then(() => {
        this.getComment(this.formData.id)
        this.comment = commentForm()
      })
    },
    // 领导批示
    Instructions () {
      this.$refs['instrDialog'].open()
    },
    // 获取评论列表
    getComment (id) {
      getCommentPage({
        id: id,
        objectType: 1,
        size: this.pageSize.size,
        current: this.pageSize.current,
      }).then(({ data }) => {
        this.commentList = data.data.records
        this.pageSize.total = data.data.total
      })
    },
    // 附件下载
    downLoad (obj) {
      downloadCount(this.formData.id).then(({ data }) => {
        if (data.data) {
          downloadFile(obj)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    handleDetail (row) {
      this.$router.push(`/mlms_spa/material/detail/${row.id}`)
    },
    getDataById (id) {
      getDataById(id).then(({ data }) => {
        if (!data.data) {
          this.$message.error(data.msg)
          this.isDelete = false
          return
        }
        this.formData = data.data
        this.getComment(data.data.id)
        // 获取优秀材料
        getGreatMaterial(data.data.creator).then(({ data }) => {
          this.greatMaterialList = data
        })
        getMaterialTotal(data.data.creator).then(({ data }) => {
          this.materialTotal = data.data
        })
      })
    },
    open (id) {
      this.getDataById(id)
    },
    // 订阅
    subscribe () {
      this.$message.info('抱歉，此功能正在开发中')
    },
    // 拜师
    apprentice () {
      if (this.userInfo.userId == this.formData.creator) {
        this.$message.error('无法向自己拜师')
        return
      }
      this.apprenticeShow = true
    },
    handleApprenticeConfirm () {
      addMasterWorker({ masterWorker: [this.formData.creator] }).then(({ data }) => {
        if (data.data) {
          this.$message.success('拜师成功！')
        } else {
          this.$message.error(data.msg)
        }
        this.apprenticeShow = false
      })
    },
    // 收藏
    handleCollect () {
      if (this.formData.collection == 1) {
        this.$message.warning('该材料已收藏，请勿重复操作！')
        return
      }
      let row = { ...this.formData }
      row.title = row.honorQualName
      this.$refs['collection'].dialogShow = true
      this.$refs['collection'].loadCollectList([row])
    },
    // 分享
    handleShare () {
      this.formData.name = this.formData.materialName
      this.$refs['share'].open([this.formData], `关于 ${this.formData.name} 材料的分享`)
    },
    // 收藏和分享的返回函数
    loadPage () {
      this.formData.collection = 1 // 收藏成功后，将是否收藏改为已收藏
      this.$emit('load-page', true)
    },
    getMoney (val) {
      for (let item of this.dictGroup.mlms_download_cost) {
        if (item.value == val) {
          return item.label
        }
      }
    },
  },
  created () {
    let params = this.$route.params
    if (params.id && this.$route.name == '查看荣誉资质') {
      this.getDataById(params.id)
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.getDataById(to.params.id)
    next()
  },
}
</script>

<style lang="scss" scoped>
.left {
  width: calc(100% - 370px);
  margin-right: 20px;
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .person {
      flex: 1;
      display: flex;
      .date {
        color: #666;
      }
      .icon {
        line-height: 20px;
        margin-right: 5px;
      }
      div {
        margin-right: 20px;
      }
    }
    .operat {
      display: flex;
      line-height: 18px;
      .button {
        margin-right: 10px;
        color: #666;
        i {
          font-size: 16px !important;
        }
      }
    }
  }
  .sub-title {
    background-color: #f5f5f5;
    padding: 20px;
  }
  .content {
    padding: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  .down-load {
    background-color: #f5f5f5;
    padding: 20px;
    margin-bottom: 20px;
    .file {
      cursor: pointer;
      &:hover {
        color: $--menu-color-primary;
      }
      i {
        font-size: 16px !important;
        margin-right: 10px;
      }
      .tip {
        margin-left: 10px;
        color: #999;
      }
      &:hover i,
      &:hover .tip {
        color: $--menu-color-primary;
      }
    }
  }
  .image {
    margin: 20px 0;
    .img-avatar {
      max-width: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    .el-button {
      margin-left: 10px;
    }
    .footer-left {
      flex: 1;
      text-align: left;
      .el-tag {
        margin: 0 10px 10px 0;
      }
    }
    .footer-right {
      .wrong {
        cursor: pointer;
        i {
          font-size: 16px !important;
        }
      }
    }
  }
}
.right {
  border: 1px solid #eee;
  width: 350px;
  padding: 20px;
  .info {
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    .name {
      font-size: 20px;
      margin-bottom: 5px;
    }
    .num {
      color: #999;
      margin-bottom: 10px;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .material {
    padding: 20px 0;
    h3 {
      font-size: 18px;
    }
    p {
      cursor: pointer;
      &:hover {
        color: $--menu-color-primary;
      }
    }
  }
}
pre {
  white-space: pre-wrap; /* css3.0 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.rate {
  width: 160px;
  display: inline-block;
  font-size: 28px;
}
</style>
<style scoped>
.footer-right >>> .icon-box {
  margin: 5px;
  padding: 0;
}
</style>
