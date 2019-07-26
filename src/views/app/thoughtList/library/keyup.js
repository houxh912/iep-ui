
import { loadContactsPyList } from '@/api/admin/contacts'

export default {
  data () {
    return {
      restaurants: [],
      state: '',
      keyupType: false,
      startPos: -1,
      content: '',
    }
  },
  methods: {
    handleKeyup (val) {
      if (val.key === ' ') { // 关闭搜索
        console.log('空格')
        this.handleEnd()
      } else if (this.keyupType) { // 根据输入搜索
        let elInput = document.getElementById('keyupStart') //根据id选择器选中对象
        var startPos = elInput.selectionStart // input 第0个字符到选中的字符
        this.state = this.formData.content.slice(this.startPos, startPos)
        console.log('state: ', this.state)
        if (this.formData.content !== this.content) {
          this.content = this.formData.content
          this.$refs['autocomplete'].focus()
          this.$nextTick(() => {
            this.$refs['content'].focus()
          })
        }
      } else if (val.key === '@') { // 打开搜索
        console.log('@')
        let elInput = document.getElementById('keyupStart') //根据id选择器选中对象
        this.startPos = elInput.selectionStart // input 第0个字符到选中的字符
        this.keyupType = true
        console.log('startPos: ', this.startPos)
      }
    },
    handleCancal () {
      this.handleEnd()
    },
    querySearchAsync (queryString, cb) {
      loadContactsPyList({ name: this.state }).then(({ data }) => {
        cb(data.data.map(m => {
          return {
            value: m.name,
            id: m.id,
          }
        }))
      })
    },
    handleSelect (item) {
      console.log('value: ', item.value)
      let elInput = document.getElementById('keyupStart') //根据id选择器选中对象
      var startPos = elInput.selectionStart // input 第0个字符到选中的字符
      this.formData.content = this.formData.content.slice(0, this.startPos) + item.value + ' ' + this.formData.content.slice(startPos)
      this.handleEnd()
    },
    // 结束
    handleEnd () {
      this.keyupType = false
      this.content = ''
    },
  },
}