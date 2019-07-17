<template>
  <div class="crms-select">
    <div class="crms-option">
      <el-select v-model="selectValue" filterable remote placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" size="small">
        <el-option v-for="item in options" :key="item.clientId" :label="item.clientName" :value="item.clientId">
        </el-option>
      </el-select>
    </div>
    <div class="crms-button">
      <!-- <el-button size="small" @click="selectClose"><i class="el-icon-close"></i></el-button> -->
      <a-button icon="close" @click="selectClose"></a-button>
    </div>
  </div>
</template>

<script>
import { getCommonPage } from '@/api/common'

export default {
  name: 'IepCrmsSelect',
  props: {
    prefixUrl: {
      type: String,
      required: true,
    },
    option: {
      type: Array,
      required: true,
      default: () => {
        return [{ id: '', name: '' }]
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
        size: 9999,
        clientName: '',
      },
    }
  },
  methods: {
    remoteMethod (val) {
      if (val == '') {
        return
      }
      this.params.clientName = val
      this.loading = true
      getCommonPage(this.prefixUrl, this.params).then(({ data }) => {
        this.options = data.data.records
        this.loading = false
      })
    },
    selectClose () {
      this.selectValue = ''
      this.$emit('close', ' ')
    },
  },
  mounted () {
    this.selectValue = this.value
    this.options = this.option.map((m) => { return { clientId: m.id, clientName: m.name } })
  },
  watch: {
    selectValue (newVal) {
      this.$emit('input', newVal)
      let name = ''
      for (let item of this.options) {
        if (item.clientId === newVal) {
          name = item.clientName
        }
      }
      this.$emit('change', newVal, name)
    },
    option (newVal) {
      if (newVal[0].name != undefined) {
        this.options = newVal.map((m) => { return { clientId: m.id, clientName: m.name } })
      }
      this.$nextTick(() => { this.selectValue = this.value ? this.value : '' })
    },
  },
}
</script>

<style lang="scss" scoped>
.crms-select {
  display: flex;
  .crms-option {
    flex: 1;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .crms-button {
    button:hover {
      background-color: #fff;
    }
  }
}
</style>
