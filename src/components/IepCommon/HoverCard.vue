<template>
  <el-popover placement="bottom" @show="handleClickChange" popper-class="popover-wrapper-no-padding" :visible-arrow="false">
    <a-card style="width: 300px">
      <!-- <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" slot="cover" /> -->
      <!-- <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" />
            <a-icon type="ellipsis" />
          </template> -->
      <a-card-meta :title="cardData.name" :description="cardData.desc">
        <a-avatar slot="avatar" :src="cardData.avatar" />
      </a-card-meta>
    </a-card>
    <a-button slot="reference" size="small" :type="type">{{obj.name}}</a-button>
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
<style>
.popover-wrapper-no-padding {
  padding: 0 !important;
}
</style>

<style lang="scss" scoped>
.card-data-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
