<template>
  <a-card :bordered="false" class="aside-card">
    <div class="account-center-avatarHolder">
      <div class="avatar">
        <iep-img style="width:100%" :src="form.logo"></iep-img>
      </div>
      <div class="username">{{form.name}}</div>
      <div class="bio">{{form.abrName}}</div>
    </div>
    <div class="account-center-detail">
      <p>
        <i class="icon-huiyikaihuitaolun"></i>联盟所属：{{form.unionName}}
      </p>
      <p>
        <i class="icon-rencai"></i>成员数量：{{form.memberNum}}
      </p>
      <p>
        <i class="icon-bumen"></i>部门数量：{{form.deptNum}}
      </p>
    </div>
    <iep-divider :dashed="true" />

    <div class="account-center-team">
      <div class="teamTitle">
        管理员
      </div>
      <a-spin :spinning="pageLoading">
        <div class="members">
          <a-row>
            <a-col :span="12" v-for="(item, index) in form.adminList" :key="index">
              <div class="member">
                <iep-img-avatar size="small" :src="item.avatar"></iep-img-avatar>
                <span class="member-name">
                  {{ item.name }}
                  <a-icon class="close" type="close" @click="handleUnsetAdmin(item.id)" />
                </span>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="member">
                <a-button type="dashed" size="small" icon="plus" @click="handleAddAdmin" block>管理员</a-button>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-spin>
    </div>
    <iep-divider />
    <a-list itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-list-item-meta>
          <a slot="title">{{ item.title }}</a>
          <span slot="description">
            <span class="security-list-description">{{ item.description }}</span>
          </span>
        </a-list-item-meta>
        <template v-if="item.actions">
          <a-switch slot="actions" :loading="pageLoading" checkedChildren="开" unCheckedChildren="关" :checked="form[item.propName]" @change='item.actions.callback' />
        </template>
      </a-list-item>
    </a-list>
    <add-admin-dialog ref="AddAdminDialog" @load-page="loadPage"></add-admin-dialog>
  </a-card>
</template>

<script>
import mixins from '@/mixins/mixins'
import { getOrgBySelf, unSetOrgAdmin, setOrgAdmin, toggleOrgOpen } from '@/api/goms/org'
import AddAdminDialog from './AddAdminDialog'
import { initForm } from './options'
const initSwitchForm = () => {
  return {
    logo: '',
    name: '',
    managerList: [],
    memberNum: 0,
    deptNum: 0,
    isOpen: true,
    isUserLocked: true,
    outOpen: true,
    joinNoA: true,
  }
}
export default {
  mixins: [mixins],
  components: { AddAdminDialog },
  data () {
    return {
      pageLoading: true,
      form: initSwitchForm(),
      data: [
        {
          title: '对外开放',
          propName: 'outOpen',
          description: '对平台用户开放组织页面',
          actions: { callback: () => { this.$message('开发中') } },
        },
        {
          title: '允许加入',
          propName: 'isOpen',
          description: '允许用户申请加入组织',
          actions: {
            callback: () => {
              toggleOrgOpen().then(({ data }) => {
                if (!data.data) {
                  this.$message.success(data.msg)
                }
                this.loadPage()
              })
            },
          },
        },
        {
          title: '入组免审',
          propName: 'joinNoA',
          description: '默认自动通过用户入组申请',
          actions: { callback: () => { this.$message.error('开发中') } },
        },
      ],
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    handleAddAdmin () {
      this.$refs['AddAdminDialog'].dialogShow = true
      this.$refs['AddAdminDialog'].formRequestFn = setOrgAdmin
      this.$refs['AddAdminDialog'].form = initForm()
    },
    handleUnsetAdmin (id) {
      this._handleComfirm(id, unSetOrgAdmin, '撤销其管理员')
    },
    loadPage () {
      this.pageLoading = true
      getOrgBySelf().then((res) => {
        this.form = this.$mergeByFirst(initSwitchForm(), res.data.data)
        this.pageLoading = false
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-card {
  background-color: #fafafa;
}
.teamTitle {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 12px;
}
.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;

  & > .avatar {
    margin: 0 auto;
    width: 200px;
    height: 104px;
    margin-bottom: 20px;
    /* border-radius: 50%; */
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .username {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 4px;
  }
}
.account-center-detail {
  p {
    margin-bottom: 8px;
    padding-left: 26px;
    position: relative;
    i {
      margin-right: 5px;
      font-size: 14px;
    }
  }
}
.account-center-team {
  .members {
    .member {
      display: flex;
      align-items: center;
      margin: 12px 0;
      // line-height: 24px;
      // height: 24px;
      .member-name {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        // line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin: 0 8px 0 4px;
        transition: all 0.3s;
        display: inline-block;
        &:hover {
          color: #999;
          .close {
            cursor: pointer;
            color: red;
          }
        }
      }
    }
  }
}
</style>
