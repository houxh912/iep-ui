<template>
  <div>
    <a-tag v-for="(tag, index) in tags" :key="tag" :closable="index !== -1" :afterClose="() => handleClose(tag)">
      {{`${tag.slice(0, 20)}...`}}
    </a-tag>
    <a-input v-if="inputVisible" ref="input" type="text" size="small" :style="{ width: '78px' }" :value="inputValue" @change="handleInputChange" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
    <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> 新建标签
    </a-tag>
    <a-tag color="blue" @click.native="handleMore">更多</a-tag>
    <tag-dialog ref="TagDialog" @load-page="loadPage" @select-one="handleSelectTag"></tag-dialog>
  </div>
</template>
<script>
import TagDialog from './TagDialog'
export default {
  name: 'IepTag',
  components: { TagDialog },
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
    tags: {
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
    handleSelectTag (name) {
      this.handleInputConfirm(name)
    },

    loadPage () {

    },

    handleMore () {
      this.$refs['TagDialog'].selectedTags = this.tags
      this.$refs['TagDialog'].loadPage()
      this.$refs['TagDialog'].dialogShow = true
    },

    handleClose (removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag)
      this.tags = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange (e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm (name) {
      const inputValue = name || this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      })
    },
  },
}
</script>
