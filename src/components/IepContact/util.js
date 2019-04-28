import _ from 'lodash'
import pinyin from 'pinyin'
const _onFlattenTree = (tree)  => {
  function recurse (nodes, path) {
    return _.map(nodes, function (node) {
      var newPath = _.union(path, [node.label])
      return [
        _.assign({ level: path.length }, _.omit(node, 'children')),
        recurse(node.children, newPath),
      ]
    })
  }
  const flattenData = _.flattenDeep(recurse(tree, []))
  const uniqData = _.uniqBy(flattenData.filter(m => m.level === 2), 'value')
  const pinyinData = uniqData.map(m => {
    const { label } = m
    const pyArr = pinyin(label, {
      style: pinyin.STYLE_NORMAL, // 设置拼音风格
    })
    const pysArr = pinyin(label, {
      style: pinyin.STYLE_FIRST_LETTER, // 设置拼音风格
    })
    const py = _.flatten(pyArr).join('')
    const pys = _.flatten(pysArr).join('')
    // console.log(label, pyArr, py, pysArr, pys)
    return {
      ...m,
      py,
      pys,
    }
  })
  return pinyinData
}

export { _onFlattenTree }