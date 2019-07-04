<template>
  <el-popover placement="bottom" @show="handleClickChange">
    <iep-user-card></iep-user-card>
    <a-button class="user-btn" size="small" slot="reference">
      {{obj.name}}
      <a-icon type="idcard" />
    </a-button>
  </el-popover>
</template>
<script>
import { getEmployeeProfileById } from '@/api/hrms/employee_profile'
const filterUser = (data) => {
  return {
    avatar: data.avatar,
    name: data.name,
    desc: data.roleName.join('，'),
  }
}
const functionMap = {
  user: getEmployeeProfileById,
}
const dataFilterMap = {
  user: filterUser,
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
        desc: '',
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
