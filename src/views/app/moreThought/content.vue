<template>
  <div class="content-tpl">
    <div class="content" v-html="transfHtml(data.content)"></div>
    <div class="image-list" v-if="data.images.length > 0">
      <iep-img :src="item" v-for="(item, index) in data.images" :key="index" class="img"></iep-img>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    // 查看人物详情
    handlePerson (val) {
      console.log('val: ', val)
    },
    // 将说说的内容转换成为新的内容
    transfHtml (val) {
      if (!val) return val
      val = this.transfSubject(val)
      val = this.transfPerson(val)
      return val
    },
    // 话题转换 - 只存在一个
    transfSubject (val) {
      let first = val.indexOf('#')
      let second = val.indexOf('# ')
      if (first === -1 // 不存在起始符号
        || second === -1 // 不存在终止符号
        || second <= first // 终止符号在起始符号前面
        || second - first > 16 // 字符长度超过15个
      ) {
        return val
      } else {
        return val.slice(0, first) + '<span class="subject">' + val.slice(first, second + 1) + '</span>' + val.slice(second + 1)
      }
    },
    // 人名转换 - 可存在多个
    transfPerson (val) {
      let html = '' // 定义html内容
      let reg = /[~!@#$%^&*/|,.，。！￥<>?";:_=[\]{}]/ // 人名中不允许出现符号，即提高人名判断的准确性
      let fn = (value) => {
        let first = value.indexOf('@')
        let second = value.slice(first).indexOf(' ')
        if (first === -1) { // 不存在起始符号
          html += value
          return [value, false]
        } else if (second === -1 // 不存在终止符号
          || second > 11 // 字符长度超过10个
          || reg.test(value.slice(first + 1, first + second))
        ) {
          // 说明这个@不合格，需要判断是否存在下一个@是否合格
          if (value.slice(first + 1).indexOf('@') > -1) { // 若存在下一个@，继续循环
            html += value.slice(0, first + 1)
            return [value, value.slice(first + 1)]
          } else { // 若不存在，结束循环
            html += value
            return [value, false]
          }
        } else {
          let name = value.slice(first + 1, first + second)
          let content = value.slice(0, first) 
            + `<a class="person" href="/app/personal_style/${name}" target="_blank">`
            + value.slice(first, first + second + 1) 
            + '</a>'
          html += content
          return [content, value.slice(first + second + 1)]
        }
      }
      // 判断是否存在多个
      let isTransf = (value) => {
        let arr = fn(value)
        if (arr[1]) {
          isTransf(arr[1])
        }
      }
      // 起始函数，判断是否存在人物
      if (val.indexOf('@') > -1) {
        isTransf(val)
      } else {
        html = val
      }
      return html
    },
  },
}
</script>

<style lang="scss" scoped>
.content-tpl {
  .image-list {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .img {
      width: 30%;
      height: 175px;
    }
  }
}
</style>
