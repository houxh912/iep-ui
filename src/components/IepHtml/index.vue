<template>
  <div v-html="value"></div>
</template>
<script>
//引入 Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')//此处可在index.html中引入：font-awesome cdn地址：<link href="https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
require('froala-editor/css/froala_style.min.css')
export default {
  name: 'IepHtml',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
