<template>
  <div class="tags">
    <el-tag
      type="info"
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="true"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-button class="button-new-tag" size="small" @click="addTags()"><i class="el-icon-plus"></i></el-button>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">快速添加</el-button>
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
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    // 关闭tag
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 添加tag
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 失去焦点事件，将数据添加到数组中
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
          // 判断是否存在重复值
        for (let item of this.dynamicTags) {
          if (item === inputValue) {
            this.$message.error('存在重复值，请重新填写！')
            return
          }
        }
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    addTags () {
      this.$emit('addTags', true)
    },
  },
  watch: {
    dynamicTags (newVal) {
      this.$emit('input', newVal)
    },
  },
}
</script>

<style lang="scss" scoped>
.tags {
  margin: 0;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
