<template>
  <div class="tms-tag-wrapper">
    <el-tag :key="tag.id" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
      {{tag.name}}
    </el-tag>
    <el-autocomplete v-if="inputVisible" class="input-new-tag" v-model="inputValue" value-key="commonName" ref="saveTagInput" size="small" :fetch-suggestions="querySearch" placeholder="请输入内容" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
    <!-- <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>-->
    <el-button v-else class="button-new-tag" type="primary" plain size="small" @click="showInput">+</el-button>
  </div>
</template>

<script>
import { getResultList } from '@/api/tms/management'
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data () {
    return {
      inputVisible: false,
      inputValue: '',
    }
  },
  computed: {
    dynamicTags: {
      // getter
      get: function () {
        return this.value
      },
      // setter
      set: function (value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    handleSelect (item) {
      if (item.commonName) {
        this.dynamicTags.push({
          id: item.commonId,
          name: item.commonName,
        })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.commonName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    async querySearch (queryString, cb) {
      const { data } = await getResultList({ name: queryString })
      const tags = data.data
      const results = queryString ? tags.filter(this.createFilter(queryString)) : tags
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.findIndex(item => item.id === tag.id), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

  },
}
</script>

<style lang="scss" scoped>
.tms-tag-wrapper ::v-deep .el-tag + .el-tag {
  margin-left: 10px;
  margin-bottom: 5px;
}
.tms-tag-wrapper ::v-deep .el-tag + .input-new-tag {
  margin-left: 10px;
}
.tms-tag-wrapper ::v-deep .el-tag + .button-new-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-bottom: 5px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  margin-bottom: 5px;
  vertical-align: bottom;
}
</style>
