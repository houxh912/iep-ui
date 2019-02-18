exports.getOrgList = async function (ctx) {
  const json = {
    code: 0,
    msg: 'success',
    data: [
      { name: '北方区业务一部' },
      { name: '北方区业务二部' },
      { name: '北方区业务三部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
      { name: '北方区业务一部' },
    ]
  }
  ctx.body = json
}