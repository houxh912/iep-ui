<template>
  <div class="project-select">
    <div class="project-option">
      <el-select
        v-model="selectValue"
        filterable
        remote
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        size="small">
        <el-option
          v-for="item in options"
          :key="item.clientId"
          :label="item.clientName"
          :value="item.clientId">
        </el-option>
      </el-select>
    </div>
    <div class="project-button">
      <a-button icon="close" @click="selectClose"></a-button>
    </div>
  </div>
</template>

<script>
import { getCommonPage } from '@/api/common'

export default {
  name: 'IepProjectSelect',
  props: {
    prefixUrl: {
      type: String,
      default: '/prms/iepProjectInformation/page',
    },
    option: {
      type: Array,
      required: true,
      default: () => {
        return [{id: '', name: ''}]
      },
    },
    value: {
      // type: Number,
      required: true,
    },
  },
  data () {
    return {
      selectValue: '',
      options: [],
      loading: false,
      params: {
        current: 1,
        size: 10,
        projectName: '',
      },
    }
  },
  methods: {
    remoteMethod (val) {
      if (val == '') {
        return
      }
      this.params.projectName = val
      this.loading = true
      getCommonPage(this.prefixUrl, this.params).then(({data}) => {
        this.options = data.data.records
        this.loading = false
      })
    },
    selectClose () {
      this.selectValue = ''
    },
  },
  mounted () {
    this.selectValue = this.value
    this.options = this.option.map((m) => {return {clientId: m.id, clientName: m.name}})
  },
  watch: {
    selectValue (newVal) {
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    },
    option (newVal) {
      if (newVal[0].name != undefined) {
        this.options = newVal.map((m) => {return {clientId: m.id, clientName: m.name}})
      }
      this.$nextTick(() => { this.selectValue = this.value ? this.value : '' })
    },
  },
}
</script>

<style lang="scss" scoped>
.project-select {
  display: flex;
  .project-option {
    flex: 1;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .project-button {
    button:hover {
      background-color: #fff;
    }
  }
}
</style>
