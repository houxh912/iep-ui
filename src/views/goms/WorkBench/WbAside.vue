<template>
  <div class="aside">
    <span class="popup-btn" @click="hideAside"><i class="el-icon-caret-right"></i></span>
    <el-scrollbar>
      <Card class="avatar-card-box" :bordered="false" dis-hover>
        <div style="text-align:center">
          <iep-img style="width:100%" :src="orgDetail.logo"></iep-img>
          <h3>{{orgDetail.orgName}}</h3>
          <div class="num-box">
            <h4>联盟所属：{{orgDetail.orgName}}</h4>
            <h4>成员数量：{{orgDetail.memberNum}}</h4>
            <h4>部门数量：{{orgDetail.deptNum}}</h4>
          </div>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <p slot="title">组织管理员</p>
        <div class="avatar-grid">
          <Avatar size="large" style="background-color: #87d068" v-for="user in orgDetail.managerList" :key="user.id">{{user.name}}</Avatar>
          <Avatar size="large">+</Avatar>
        </div>
      </Card>
      <Card :bordered="false" dis-hover>
        <CellGroup>
          <Cell title="允许加入" label="允许用户申请加入组织">
            <el-switch slot="extra" v-model="orgDetail.isOpen" :active-value="0" :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </Cell>
          <Cell title="开启管理员审核" label="用户加入组织需要管理员审核">
            <el-switch slot="extra" v-model="isOpen" :active-value="0" :inactive-value="1" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
          </Cell>
        </CellGroup>
      </Card>
    </el-scrollbar>
  </div>
</template>
<script>
import { orgDetail } from '@/api/admin/org'
export default {
  data () {
    return {
      orgDetail: {},
    }
  },
  computed: {
    isShow300px () {
      if (this.isTablet()) {
        return '0'
      }
      return this.showAside ? '300px' : '0'
    },
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      orgDetail().then((res) => {
        this.orgDetail = res.data.data
      })
    },
    hideAside () {
      this.$emit('aside-hide')
    },
  },
}
</script>
<style  lang="scss" scoped>
.num-box {
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
.avatar-grid {
  margin: 0 15px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
}
.avatar-card-box {
  width: 100%;
}
.aside {
  background: #fafafa;
  font-size: 12px;
  margin: 0;
  box-sizing: border-box;
  .popup-btn {
    position: absolute;
    top: 40%;
    left: -31px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #eee;
    border-right: 0;
    border-radius: 3px 0 0 3px;
    color: #bfbfbf;
    background: #fafafa;
    cursor: pointer;
    &:hover,
    &:focus {
      background-color: #eee;
      color: #fff;
      box-shadow: 0 1px 1px 1px #eee;
    }
  }
  .el-scrollbar {
    position: relative;
    height: calc(100% - 64px);
    padding: 0;
    .el-scrollbar__view {
      > div {
        padding: 10px 10px 20px 10px;
        border-bottom: 1px solid #ececec;
      }
    }
  }
}
</style>
