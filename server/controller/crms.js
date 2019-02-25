exports.fetchList = async function (ctx) {
  ctx.body = {
    code: 0,
    msg: 'success',
    data: {
      records: [
        {
          id: 1,
          name: '客户1'
        }, {
          id: 2,
          name: '客户2'
        }
      ],
      total: 2,
      size: 10,
      current: 1,
      searchCount: true,
      pages: 1,
    }
  }
}