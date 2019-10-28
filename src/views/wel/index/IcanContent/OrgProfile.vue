<template>
  <div class="org-profile-wrapper">
    <div class="logo-wrapper">
      <iep-img class="logo" :src="form.logo"></iep-img>
    </div>
    <div class="info-wrapper">
      <div class="desc-wrapper">
        <div class="title-wrapper">
          <div class="title">
            <span class="name">{{form.name}}</span>
            <span class="label">虚拟</span>
          </div>
          <div class="style-item">
            <a class="style" :href="`${this.ican_host}org/${form.orgId}.html`">SO风采</a>
            <a v-if="sys_role_add" class="style" @click.prevent="$openPage(`/goms/basic_configuration/organization_information`)">完善SO</a>
          </div>
        </div>
        <div class="detail-wrapper">
          <div>创建人：{{form.creatorName}}</div>
          <div>成立时间：{{form.establishTime}}</div>
          <div>行业：
            <iep-dict-detail :value="form.orgType" dict-name="GOMS_ORG_TYPE"></iep-dict-detail>
          </div>
        </div>
      </div>
      <div class="data-wrapper">
        <div>
          <div class="number">{{form.countValue[0]}}</div>
          <div>信用值</div>
        </div>
        <div>
          <div class="number">{{form.countValue[1]}}</div>
          <div>活跃度</div>
        </div>
        <!-- <div>
          <div class="number">670</div>
          <div>关注量</div>
        </div> -->
        <div>
          <div class="number">{{form.countValue[2]}}</div>
          <div>数据资产</div>
        </div>
        <div>
          <div class="number">{{form.countValue[3]}}</div>
          <div>组织成员</div>
        </div>
        <div>
          <div class="number">{{form.countValue[4]}}</div>
          <div>组织财富</div>
        </div>
        <div>
          <div class="number">{{form.countValue[5]}}</div>
          <div>资料完善</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import website from '@/const/website'
import { mapGetters } from 'vuex'
import { getOrgProfile } from '@/api/wel/et'
export default {
  data () {
    return {
      ican_host: website.ican_host,
      form: {
        countValue: [0, 0, 0, 0, 0, 0],
        creatorName: '',
        establishTime: '',
        logo: '',
        name: '',
        orgId: 0,
        orgType: '1',
      },
      sys_role_add: false,
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  created () {
    this.loadPage()
    this.sys_role_add = this.permissions['sys_role_add']
  },
  methods: {
    async loadPage () {
      const { data } = await getOrgProfile()
      this.form = this.$mergeByFirst(this.form, data.data)
    },
  },
}
</script>
<style lang="scss" scoped>
.data-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    text-align: center;
    border-left: 1px solid #eee;
    color: #999;
    &:first-child {
      border: none;
    }
  }
  .number {
    font-size: 18px;
    color: #333;
  }
}
.desc-wrapper {
  justify-content: space-around;
}
.data-wrapper,
.desc-wrapper {
  flex: 1;
}
.detail-wrapper {
  > div {
    margin-right: 20px;
  }
}
.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .style-item {
    color: $--color-primary;
    border: 1px solid;
    border-radius: 20px;
    .style {
      color: $--color-primary;
      padding: 0 8px;
      border-left: 1px solid;
      &:first-child {
        border: none;
      }
    }
  }
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    .name {
      font-size: 20px;
      margin-right: 20px;
      font-weight: 600;
    }
    .label {
      font-size: 14px;
      padding: 0px 5px;
      border: 1px solid #eee;
      color: $--color-primary;
      border-radius: 4px;
    }
  }
}
.title-wrapper,
.detail-wrapper {
  display: flex;
}
.info-wrapper,
.desc-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.org-profile-wrapper {
  margin: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 12px;
  display: flex;
}
.logo-wrapper {
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 5px;
  width: 142px;
  height: 142px;
  margin-right: 20px;
}
.logo {
  width: 130px;
  height: 130px;
}
</style>
