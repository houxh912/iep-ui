const optNameMap = {
  delete: '删除',
}
function pageOption () {
  return {
    current: 1,
    size: 10,
  }
}
export default {
  data () {
    return {
      pagedTable: [],
      isLoadTable: true,
      pagination: pageOption(),
      pageOption: pageOption(),
    }
  },
  methods: {
    search () {
      this.pageOption = pageOption()
      this.loadPage()
    },
    loadTable (param, requestFn, fn = (m) => m) {
      this.isLoadTable = true
      requestFn({ ...param, ...this.pageOption }).then(({ data }) => {
        const { records, size, total, current } = data.data
        this.pagination = { current, size, total }
        this.pagedTable = records.map(fn)
        this.isLoadTable = false
      })
    },
    handleSizeChange (val) {
      this.pageOption.current = this.pagination.current
      this.pageOption.size = val
      this.loadPage()
    },
    handleCurrentChange (val) {
      this.pageOption.current = val
      this.pageOption.size = this.pagination.size
      this.loadPage()
    },
    _handleGlobalDeleteById (id, delFunction) {
      this._handleGlobalById(id, delFunction, 'delete')
    },
    _handleGlobalDeleteAll (delFunction) {
      this._handleGlobalAll(delFunction, 'delete')
    },
    _handleGlobalById (id, optFunction, opt = 'delete') {
      const optName = optNameMap[opt]
      this.$confirm(`此操作将永久${optName}该数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(id).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `${optName}成功!`,
            })
          } else {
            this.$message({
              type: 'info',
              message: `${optName}失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
    _handleGlobalAll (optFunction, opt = 'delete') {
      let Ids = this.mutipleSelection
      const optName = optNameMap[opt]
      if (Ids === undefined || Ids.length === 0) {
        this.$message(`请先选择需要${optName}的选项`)
        return
      }
      this.$confirm(`此操作将永久${optName}这些数据, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        optFunction(Ids).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: `${optName}成功!`,
            })
            this.pageOption = pageOption()
          } else {
            this.$message({
              type: 'info',
              message: `${optName}失败，${res.data.msg}`,
            })
          }
          this.load()
        })
      })
    },
  },
}