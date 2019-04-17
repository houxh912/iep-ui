<template>
  <div id="app" class="app">
    <froala :tag="'textarea'" :config="froalaConfig" v-model="froalaContent"></froala>
  </div>
</template>

<script>
// import VueFroala from 'vue-froala-wysiwyg'
import store from '@/store'
export default {
  name: 'IepFroalaEditor',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      //More -> https://www.froala.com/wysiwyg-editor/docs/options
      froalaConfig: {
        height: '300',
        toolbarButtons: ['undo', 'redo', 'clearFormatting', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'fontFamily', 'fontSize', 'color', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'quote', '-', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|', 'insertHR', 'selectAll', '|', 'print', 'spellChecker', 'help', '|', 'fullscreen'],//['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],//显示可操作项
        // theme: "dark",//主题
        placeholder: '请填写内容',
        language: 'zh_cn',//国际化
        imageUploadURL: '/api/admin/file/wysiwyg/upload',//上传url
        fileUploadURL: '/api/admin/file/wysiwyg/upload',//上传url 更多上传介绍 请访问https://www.froala.com/wysiwyg-editor/docs/options
        quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr'],//快速插入项
        toolbarVisibleWithoutSelection: true,//是否开启 不选中模式
        // disableRightClick: true,//是否屏蔽右击
        imageDefaultWidth: 500,
        colorsHEXInput: false,//关闭16进制色值
        toolbarSticky: true,//操作栏是否自动吸顶
        zIndex: 500,
        requestHeaders: { Authorization: 'Bearer ' + store.getters.access_token },
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          },
        },
      },
    }
  },
  computed: {
    froalaContent: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
// <style lang="scss" scoped>
// .app {
//   height: 500px !important;
// }
//
</style>

<style>
.fr-wrapper > div[style*="z-index: 9999"] {
  position: absolute;
  top: -10000px;
  opacity: 0;
}
.fr-element.fr-view {
  position: absolute;
  top: 0;
}
.fr-placeholder {
  margin-top: 0 !important;
}
</style>
