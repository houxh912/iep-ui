<template>
  <div class="add-tab">
    <span class="el-tag-item" v-for="(tag, index) in dynamicTags" :key="index">
      <el-input v-if="updateIndex === index" class="input-new-tag" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
      <el-tag closable :disable-transitions="transitions" @close="handleClose(tag)" type="info" @click="updateTag(tag, index)" v-else>
        {{tag}}
      </el-tag>
    </span>
    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput"><i class="el-icon-plus"></i></el-button>
    <span class="error" v-if="isError">此条数据已存在</span>
  </div>
</template>

<script>
export default {
  name: 'GovAddTags',
  props: {
    value: {
      type: Array,
      default: () => { },
    },
  },
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      isError: false,
      updateIndex: -1,
      transitions: true,
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
    // 输入完成
    handleInputConfirm () {
      let inputValue = this.inputValue
      // 查重
      for (let index in this.dynamicTags) {
        if (this.dynamicTags[index] === inputValue && index !== this.updateIndex) {
          this.isError = true
          return
        }
      }
      if (inputValue) {
        if (this.updateIndex === -1) {
          this.dynamicTags.push(inputValue)
        } else {
          this.dynamicTags[this.updateIndex] = inputValue
        }
      }
      this.isError = false
      this.inputVisible = false
      this.inputValue = ''
      this.$emit('input', this.dynamicTags)
      this.updateIndex = -1
    },
    updateTag (tag, index) {
      this.updateIndex = index
      this.inputValue = tag
    },
  },
}
</script>

<style lang="scss">
.add-tab {
  .el-tag-item {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    margin-right: 10px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-right: 10px;
    vertical-align: bottom;
  }
  .error {
    color: #f00;
    font-size: 12px;
    margin-left: 10px;
  }
}
</style>

