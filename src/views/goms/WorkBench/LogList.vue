<script>
export default {
  name: 'LogList',
  props: {
    logList: {
      type: Array,
    },
  },
  render () {
    function flatMap (array, fn) {
      var result = []
      for (var i = 0; i < array.length; i++) {
        var mapping = fn(array[i], i)
        result = result.concat(mapping)
      }
      return result
    }
    // TODO:替换成真数据
    const demoLogList = this.logList.map(m => m.description)
    const time = this.logList.map(m => m.time)
    const formatLogList = demoLogList.map(m => {
      const templateArray = m.split(',')
      const template = templateArray.shift()
      const nameList = templateArray
      return {
        template,
        nameList,
      }
    })
    const log = formatLogList.map((m, i) => {
      let result = m.template
      result = flatMap(result.split('$'), function (part, i) {
        return [part, <span style="color:#2558a9;">{m.nameList[i]}</span>] // JSX
      })
      result.pop()
      return <p>{result}<span style="float:right;padding-right:20px;">{time[i]}</span></p>
    })
    // console.log(log)
    return (
      <div>{log}</div>
    )
  },
}
</script>
