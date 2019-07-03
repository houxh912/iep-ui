export const gruber = {
  block: {
    //自定义每题的题干、选项、答案和解析
    //题干
    qtTitle: function qtTitle (block) {
      let m = block.match(/^(([0-9]+\.)|(((\()|（)[0-9]+((\))|）)))\s*(.*?)\s*(?:\n|$)/)
      if (!m) return undefined
      let title = ['title'].concat(m[8])
      return title
    },
    //选项
    qtKey: function qtKey (block, qt_type) {
      let m = block.match(/^([A-Z])(\.)\s*(.*?)\s*(?:\n|$)/)
      if (!m) return undefined
      if (qt_type === 13 || qt_type === 12) {
        let n = m[1].match(/^[A-Z]/)
        let key = [n[0]].concat(m[3])
        return key
      } else {
        let error = ['key_error']
        error.push(m[0])
        return error
      }
    },
    //答案
    qtAnswer: function qtAnswer (block, qt_type) {
      let m = block.match(/^(答案[:：])\s*(.*?)\s*(?:\n|$)/)
      if (!m) return undefined
      let answer = ['answer']
      let n
      if (qt_type === 13) {
        n = m[2].match(/^\s*[a-z]\s*(?:\n|$)/i)
        if (n == null) {
          let error = ['ans_error']
          error.push(m[2])
          return error
        } else {
          answer.push(m[2].toUpperCase())
        }
      } else if (qt_type === 12) {
        n = m[2].match(/^\s*[a-z]{1,26}\s*(?:\n|$)/i)
        if (n == null) {
          let error = ['ans_error']
          error.push(m[2])
          return error
        } else {
          answer.push(m[2].toUpperCase().split(''))
        }
      } else if (qt_type === 11) {
        n = m[2].match(/^\s*(正确|错误|对|错)\s*(?:\n|$)/i)
        if (n == null) {
          let error = ['ans_error']
          error.push(m[2])
          return error
        } else {
          const txt = m[2] == '对' ? '正确' : m[2] == '错' ? '错误' : m[2]
          answer.push(txt)
        }
      } else {
        answer.push(m[2])
      }
      return answer
    },
    // 解析
    qtAnalysis: function qtAnalysis (block) {
      let m = block.match(/^(解析[:：])\s*(.*?)\s*(?:\n|$)/)
      if (!m) return undefined
      let analysis = ['analysis']
      analysis.push(m[2])
      return analysis
    },
    // 标签
    qtTag: function qtTag (block) {
      let m = block.match(/^(标签[:：])\s*(.*?)\s*(?:\n|$)/)
      if (!m) return undefined
      let res = /([、，,．]|\.)/g
      m[2] = m[2].replace(res, ',')
      let labels = ['tag']
      labels.push(m[2])
      return labels
    },
    para: function para (block) {
      return ['para'].concat(block)
    },
  },
}

export const markArray = [
  'qtTitle', 'qtKey', 'qtAnswer', 'qtAnalysis', 'qtTag', 'para',
]