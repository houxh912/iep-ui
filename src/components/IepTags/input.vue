<template>
  <div class="tags">
    <el-tag
      type="info"
      :key="tag"
      v-for="(tag, index) in dynamicTags"
      closable
      :disable-transitions="true"
      @close="handleClose(index)">
      {{tag}}
    </el-tag>
    <el-input v-model="inputValue">
      <el-button slot="append" @click="handleCreate">添加</el-button>
    </el-input>
    <span class="error">{{errorMsg}}</span>
  </div>
</template>

<script>
export default {
  name: 'tags',
  props: [ 'value' ],
  computed: {
    dynamicTags () {
      return this.value ? this.value : []
    },
  },
  data () {
    return {
      inputValue: '',
      errorMsg: '',
    }
  },
  methods: {
    handleClose (index) {
      this.dynamicTags.splice(index, 1)
    },
    handleCreate () {
      let inputValue = this.inputValue
      if (inputValue) {
          // 判断是否存在重复值
        for (let item of this.dynamicTags) {
          if (item === inputValue) {
            this.errorMsg = '存在重复值，请重新填写！'
            return
          }
        }
        this.dynamicTags.push(inputValue)
      }
      this.inputValue = ''
      this.$emit('input', this.dynamicTags)
    },
  },
  watch: {
    inputValue () {
      this.errorMsg = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  .el-tag--info {
    margin-right: 10px;
  }
  .el-tag + .el-tag {
    margin-right: 10px;
  }
  .error {
    color: #f00;
    font-size: 12px;
  }
}
</style>
