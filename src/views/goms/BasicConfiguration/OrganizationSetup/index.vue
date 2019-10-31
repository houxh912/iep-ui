<template>
  <div>
    <basic-container>
      <iep-page-header title="SO变更"></iep-page-header>
      <div class="message-box" v-for="(item,i) in message" :key="i">
        <template v-if="item.status===4">
          <i class="el-icon-info"></i>
          <span class="message-text"> 您创建的联盟正在审核中。</span>
        </template>
        <template v-if="item.status===3">
          <i class="el-icon-info"></i>
          <span class="message-text">{{userInfo.orgName}} 现在属于 {{item.union.name}}。</span>
          <iep-button type="primary" plain disabled>申请退出</iep-button>
        </template>
        <template v-if="item.status===2">
          <i class="el-icon-info"></i>
          <span class="message-text">{{item.user.name}} 邀请 {{userInfo.orgName}} 加入 {{item.union.name}}。</span>
          <operation-wrapper style="display:inline-block;">
            <iep-button type="primary" @click="handleAgree(item.id)" plain>同意</iep-button>
            <iep-button @click="handleRefuse(item.id)" plain>拒绝</iep-button>
          </operation-wrapper>
        </template>
        <template v-if="item.status===1">
          <i class="el-icon-info"></i>
          <span class="message-text"> {{userInfo.orgName}} 现在无所属联盟。</span>
        </template>
      </div>
      <iep-divider />
      <div class="change-record">
        <span>查看变更记录>></span>
      </div>
      <el-row class="row-bg">
        <el-col :span="8" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>创建联盟<i></i></span>
            </div>
            <div class="text item">
              联盟即常规组织的并集，对下属组织拥有集中管理的权限（包括财务），使用场景包括集团、协会、以组织为单位的项目组织。
            </div>
            <iep-button type="warning" plain @click="handleCreateLeague">创建</iep-button>
          </div>
        </el-col>
        <el-col :span="8" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>SO升级<i></i></span>
            </div>
            <div class="text item">
              组织创建者可将组织下属的一个部门分离为独立组织，默认子组织仍属于此创建人；转让后，该组织与母组织自动形成联盟，且通用母组织的各功能模块的标准配置。
            </div>
            <iep-button disabled plain>升级</iep-button>
          </div>
        </el-col>
        <el-col :span="8" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>SO合并<i></i></span>
            </div>
            <div class="text item">
              联盟状态下，组织创建者可定向邀请联盟的兄弟组织进行合并；合并后的组织各项模块配置和文档均以发起组织为主，被合并组织的部分内容将被吞并。
            </div>
            <iep-button disabled plain>合并</iep-button>
          </div>
        </el-col>
        <el-col :span="8" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>SO转让<i></i></span>
            </div>
            <div class="text item">
              组织创建者可将组织装让给组织现有的管理员之一；转让后，创建者自动退出组织管理。
            </div>
            <iep-button disabled plain>转让</iep-button>
          </div>
        </el-col>
        <el-col :span="8" class="organize-item">
          <div class="organize-con">
            <div slot="header" class="clearfix sub-title">
              <span>SO解散<i></i></span>
            </div>
            <div class="text item">
              组织创建者可解散组织；解散后，组织内的所有消息记录和成员信息都会删除，成员将无法进入，请谨慎操作。
            </div>
            <iep-button disabled plain>解散</iep-button>
          </div>
        </el-col>
      </el-row>
    </basic-container>
    <create-org-dialog-form ref="CreateOrgDialogForm" @load-page="loadPage"></create-org-dialog-form>
    <create-union-dialog-form ref="CreateUnionDialogForm" @load-page="loadPage"></create-union-dialog-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { addObj } from '@/api/admin/org'
import mixins from '@/mixins/mixins'
import { getOrgMessage, agreeOrgMessage, refuseOrgMessage, postUnion } from '@/api/goms/union'
import CreateOrgDialogForm from './CreateOrgDialogForm'
import CreateUnionDialogForm from './CreateUnionDialogForm'
export default {
  components: { CreateOrgDialogForm, CreateUnionDialogForm },
  mixins: [mixins],
  data () {
    return {
      message: [],
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAgree (id) {
      this._handleComfirm(id, agreeOrgMessage, '同意加入该联盟')
    },
    handleRefuse (id) {
      this._handleComfirm(id, refuseOrgMessage, '拒绝加入该联盟')
    },
    handleCreateOrg () {
      this.$refs['CreateOrgDialogForm'].formRequestFn = addObj
      this.$refs['CreateOrgDialogForm'].dialogShow = true
    },
    handleCreateLeague () {
      if ([3, 4].includes(this.message[0].status)) {
        this.$message('您已有所属联盟，无法创建新联盟。')
        return
      }
      this.$refs['CreateUnionDialogForm'].formRequestFn = postUnion
      this.$refs['CreateUnionDialogForm'].dialogShow = true
    },
    loadPage () {
      getOrgMessage().then(({ data }) => {
        this.message = data.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.change-record {
  span {
    display: inline-block;
    margin-left: 20px;
    color: #b3b3b3;
    font-size: 14px;
    cursor: not-allowed;
  }
}
.message-box {
  color: #909399;
  padding: 0 20px;
  .message-text {
    padding: 0 10px;
  }
}
.organize-group {
  text-align: center;
  .el-button.is-circle {
    margin: 20px 60px;
    width: 120px;
    height: 120px;
    border-color: #f7f7f7;
    background-color: #f7f7f7;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    span {
      display: block;
      margin-top: 10px;
    }
    i {
      display: block;
      margin-bottom: 10px;
      font-size: 34px !important;
      color: #bf051a;
    }
    &:hover,
    &:focus {
      background-color: #bf051a;
      color: #fff;
      i {
        color: #fff;
      }
    }
  }
}
.organize-item {
  display: inline-block;
  .sub-title {
    text-align: center;
    span {
      display: block;
      font-size: 18px;
      i {
        display: block;
        margin: 0 auto;
        padding-top: 10px;
        width: 30px;
        font-style: normal;
        border-bottom: 1px solid #bf051a;
      }
    }
  }
  .organize-con {
    margin: 20px;
    padding: 25px;
    text-align: center;
    border: 1px solid #d7d7d7;
    background-color: #fff;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    .item {
      margin: 15px 0;
      min-height: 54px;
      text-align: left;
      text-align: justify;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #666;
    }
    &:hover,
    &:focus {
      box-shadow: 0px 1px 1px 1px #eee;
    }
    .el-button--warning.is-plain {
      color: #bf051a;
      border-color: #bf051a;
      background-color: #fff2f4;
      &:hover,
      &:focus {
        background-color: #bf051a;
        color: #fff;
      }
    }
  }
}
.row-bg {
  margin: 0 auto;
}
</style>
