export default {
  data () {
    return {
      restaurants: [],
      state: '',
      keyupType: false,
      startPos: -1,
      timeout: null,
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
    loadAll () {
      return [{
          'value': '三全鲜食（北新泾店）',
          'address': '长宁区新渔路144号',
        },
        {
          'value': 'Hot honey 首尔炸鸡（仙霞路）',
          'address': '上海市长宁区淞虹路661号',
        },
      ]
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
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
  mounted () {
    this.restaurants = this.loadAll()
  },
}