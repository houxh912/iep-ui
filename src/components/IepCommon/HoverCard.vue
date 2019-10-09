<template>
  <el-popover placement="bottom" @show="handleClickChange">
    <iep-user-card :card-data="cardData"></iep-user-card>
    <a-button class="user-btn" size="small" slot="reference">
      {{obj.name}}
      <a-icon type="idcard" />
    </a-button>
  </el-popover>
</template>
<script>
import { getUserCard } from '@/api/hrms/employee_profile'
import { getOrgCard } from '@/api/goms/org'
const filterUser = (data) => {
  return {
    avatar: data.avatar,
    name: data.name,
    job: data.job,
    identityMarks: data.identityMarks,
    orgList: data.orgList || [],
    abilityTag: data.abilityTag || [],
    email: data.email,
    externalTitle: data.externalTitle,
    phone: data.phone,
    qq: data.qq,
    rankMap: data.rankMap,
    wechat: data.wechat,
  }
}
const filterOrg = (data) => {
  return {
    avatar: data.avatar,
    name: data.name,
    job: data.job,
    identityMarks: data.identityMarks,
    orgList: data.orgList || [],
    abilityTag: data.abilityTag || [],
    email: data.email,
    externalTitle: data.externalTitle,
    phone: data.phone,
    qq: data.qq,
    rankMap: data.rankMap,
    wechat: data.wechat,
  }
}
const functionMap = {
  user: getUserCard,
  org: getOrgCard,
}
const dataFilterMap = {
  user: filterUser,
  org: filterOrg,
}
export default {
  name: 'IepHoverCard',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    detailType: {
      type: String,
      default: 'user',
    },
    type: {
      type: String,
      default: 'default',
    },
    obj: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      cardData: {
        avatar: '',
        name: '',
        identityMarks: [],
        orgList: [],
        abilityTag: [],
        rankMap: {
          xyz: 0,
          hydpm: 0,
          gmbpm: 0,
          sjzc: 0,
        },
      },
    }
  },
  computed: {
    requestFunction () {
      return functionMap[this.detailType]
    },
    filterFunction () {
      return dataFilterMap[this.detailType]
    },
  },
  methods: {
    loadDetail () {
      this.requestFunction(this.obj.id).then(({ data }) => {
        this.cardData = this.filterFunction(data.data)
      })
    },
    handleClickChange () {
      if (!this.disabled) {
        this.loadDetail()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.user-btn {
  border-width: 0px;
}
.card-data-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
