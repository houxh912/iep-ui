<template>
  <a-popover :title="obj.name" trigger="hover" :visible="hovered" @visibleChange="handleHoverChange">
    <div slot="content">{{obj.name}}</div>
    <a-popover :title="obj.name" trigger="click" :visible="clicked" @visibleChange="handleClickChange">
      <div slot="content">
        <div>{{obj.name}}的详情信息</div>
        <a @click="hide">关闭</a>
      </div>
      <iep-button :type="type">{{obj.name}}</iep-button>
    </a-popover>
  </a-popover>
</template>
<script>
export default {
  name: 'IepHoverCard',
  props: {
    type: {
      type: String,
      default: '',
    },
    obj: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      clicked: false,
      hovered: false,
    }
  },
  methods: {
    hide () {
      this.clicked = false
      this.hovered = false
    },
    handleHoverChange (visible) {
      this.clicked = false
      this.hovered = visible
    },
    handleClickChange (visible) {
      this.clicked = visible
      this.hovered = false
    },
  },
}
</script>
